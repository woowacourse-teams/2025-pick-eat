import { createQueryString, createQueryStrings, joinAsPath } from './createUrl';

describe('joinAsPath: path 를 /로 이어주는 함수 테스트', () => {
  it('여러 경로 조각을 "/"로 잘 연결한다', () => {
    expect(joinAsPath('a', 'b', 'c')).toBe('a/b/c');
    expect(joinAsPath('foo', 'bar')).toBe('foo/bar');
  });

  it('빈 문자열도 포함되어 연결된다', () => {
    expect(joinAsPath('a', '', 'c')).toBe('a//c');
  });

  it('인자가 하나일 경우 그대로 반환한다', () => {
    expect(joinAsPath('single')).toBe('single');
  });

  it('인자가 없을 경우 빈 문자열을 반환한다', () => {
    expect(joinAsPath()).toBe('');
  });
});

describe('createQueryString: 단일 쿼리 문자열 생성 함수 테스트', () => {
  it('단순 키-값 쿼리 문자열 생성', () => {
    expect(createQueryString({ foo: 'bar' })).toBe('?foo=bar');
    expect(createQueryString({ a: '1', b: '2' })).toBe('?a=1&b=2');
  });

  it('특수문자 인코딩 확인', () => {
    expect(createQueryString({ search: '가나다', space: 'a b' })).toBe(
      '?search=%EA%B0%80%EB%82%98%EB%8B%A4&space=a+b'
    );
  });
});

describe('createQueryStrings: 여러 쿼리 객체를 병합해서 쿼리 문자열 생성해주는 함수 테스트', () => {
  it('빈 배열 입력 시 빈 문자열 반환', () => {
    expect(createQueryStrings()).toBe('');
    expect(createQueryStrings(...[])).toBe('');
  });

  it('여러 쿼리 객체를 병합해서 쿼리 문자열 생성', () => {
    expect(createQueryStrings({ a: '1' }, { b: '2' }, { c: '3' })).toBe(
      '?a=1&b=2&c=3'
    );
  });

  it('같은 키가 여러 번 나올 때 마지막 값 우선 적용', () => {
    expect(createQueryStrings({ a: '1', c: 'old' }, { b: '2', c: 'new' })).toBe(
      '?a=1&c=new&b=2'
    );
  });

  it('빈 객체도 문제없이 동작', () => {
    expect(createQueryStrings({}, { a: '1' }, {})).toBe('?a=1');
  });

  it('특수문자 인코딩 확인', () => {
    expect(createQueryStrings({ q: '검색어' }, { lang: 'ko-KR' })).toBe(
      '?q=%EA%B2%80%EC%83%89%EC%96%B4&lang=ko-KR'
    );
  });
});
