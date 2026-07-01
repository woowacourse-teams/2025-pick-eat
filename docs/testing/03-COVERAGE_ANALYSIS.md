# 03. 커버리지 분석 및 승인 프로세스 (Coverage Analysis)

테스트 코드를 새로 작성하기 **전에**, 어디부터 작성할지 정하는 분석 단계입니다. 이 문서의 절차를 거치지 않고 바로 테스트 코드를 작성하지 않습니다 — 반드시 분석 → 사용자 보고 → 승인 → 작성 순서를 따릅니다.

## 1. 리포트 생성

```bash
cd backend
./gradlew test jacocoTestReport
```

- HTML: `backend/build/reports/jacoco/test/html/index.html`
- XML: `backend/build/reports/jacoco/test/jacocoTestReport.xml` (분석은 이 XML을 파싱해서 진행)

## 2. 패키지/클래스 단위로 집계

XML에서 패키지별 LINE 커버리지를 정렬해 낮은 순으로 훑고, 커버리지가 낮은 패키지는 다시 클래스 단위로 펼쳐서 "어떤 클래스가 0%인지"까지 확인합니다. 전체 숫자(예: "75%")만 보고 끝내지 않습니다.

```bash
python3 -c "
import xml.etree.ElementTree as ET
tree = ET.parse('build/reports/jacoco/test/jacocoTestReport.xml')
root = tree.getroot()

def pct(c):
    m, v = int(c.get('missed')), int(c.get('covered'))
    total = m + v
    return v, total, (100*v/total if total else 0)

rows = []
for pkg in root.findall('package'):
    line = pkg.find(\"counter[@type='LINE']\")
    if line is None:
        continue
    v, total, p = pct(line)
    if total:
        rows.append((p, pkg.get('name'), v, total))
for p, name, v, total in sorted(rows):
    print(f'{p:5.1f}%  {v:4d}/{total:<4d}  {name}')
"
```

낮은 패키지가 보이면 그 패키지의 `class` 노드를 펼쳐 클래스별 수치까지 확인합니다 (위 스크립트의 `targets` 필터를 해당 패키지 이름으로 바꿔서 재실행).

## 3. 위험도 기준으로 분류 (숫자만 보지 않는다)

낮은 커버리지를 발견했다고 그대로 우선순위가 되는 것은 아닙니다. 아래 세 그룹으로 분류합니다.

### 그룹 A — 진짜 위험 (우선순위 1)
외부 연동, 인증/인가, 에러 응답 처리처럼 **프로덕션에서 실제로 깨졌을 때 영향이 큰 영역**.
- 예: 외부 API 클라이언트(`infrastructure` 패키지의 실제 구현체), 로그인/인증 클라이언트, `GlobalExceptionHandler` 같은 전역 예외 처리기
- 판단 기준: 이 클래스가 실패하면 사용자에게 직접 영향이 가는가? 보안/인증과 관련 있는가?

### 그룹 B — 컨트롤러/엔드포인트 누락
이미 piece/scenario 인수 테스트 틀이 있는 도메인인데 특정 엔드포인트만 빠진 경우.
- 예: 컨트롤러 클래스의 일부 메서드만 미커버
- 기존 piece 헬퍼를 재사용해 비교적 싸게 채울 수 있는 영역

### 그룹 C — 의도적으로 낮아도 되는 영역
- 부하테스트/스트레스 테스트 전용 코드(`stress/**` 등 — 이미 `build.gradle`의 jacoco 제외 목록에 포함됨)
- 단순 설정/배선 코드, 로직 없는 변환 코드
- 이 그룹은 커버리지 목표에서 빼거나 우선순위를 가장 낮게 둡니다. 발견 시 jacoco 제외 목록에 추가하는 것도 고려해 사용자에게 제안합니다.

## 4. 사용자에게 분석 결과 보고 (테스트 작성 전 필수)

분석이 끝나면 **테스트 코드를 작성하기 전에** 다음 형식으로 사용자에게 보고하고 승인을 받습니다.

1. 전체 커버리지 요약 (LINE/INSTRUCTION/BRANCH 등)
2. 그룹 A/B/C로 분류한 목록과 각 항목이 왜 그 그룹인지 1줄 근거
3. 작성 제안 우선순위 (보통 A → B 순, C는 보류 또는 제외 제안)
4. "이 순서로 진행해도 될까요?" 형태의 명시적 확인 질문

**사용자의 명시적 승인 없이 테스트 코드를 작성하지 않습니다.** 분석 결과를 보고하는 메시지와 실제 테스트 코드를 작성하는 작업은 항상 분리된 턴으로 진행합니다. 사용자가 우선순위나 범위를 조정하면 그에 따라 다시 계획을 정리한 뒤 작성을 시작합니다.

## 5. 승인 후 진행

승인을 받으면 [00-TEST_PLAN.md](00-TEST_PLAN.md) §3 작업 절차로 넘어가 승인된 순서대로 한 클래스씩 작성 → 즉시 실행 → 다음으로 넘어갑니다. 작업을 마치면 [02-QUALITY_CHECK.md](02-QUALITY_CHECK.md) 체크리스트를 수행하고, 작업 전후 커버리지 변화를 다시 1~2단계 방식으로 비교해 보고합니다.
