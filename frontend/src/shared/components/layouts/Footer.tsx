import styled from '@emotion/styled';

const HREF = {
  serviceIntro:
    'https://github.com/woowacourse-teams/2025-pick-eat?tab=readme-ov-file#-pickeat-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%86%8C%EA%B0%9C',
  feedback:
    'https://docs.google.com/forms/d/e/1FAIpQLSdmbeTkNaI7ptamRMVlvuljlBDyDZ_06qPMAJAQKMiw4SI5Mw/viewform',
  contact: 'mailto:woowa.pickeat@gmail.com',
};

function LinkButton({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <S.LinkText
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </S.LinkText>
  );
}

function Footer() {
  return (
    <S.Container>
      <S.Wrapper>
        <LinkButton href={HREF.serviceIntro}>서비스 소개</LinkButton>
        <LinkButton href={HREF.feedback}>피드백하기</LinkButton>
        <LinkButton href={HREF.contact}>문의하기</LinkButton>
      </S.Wrapper>
      <S.CopyRight>© 2025 Copyright Pickeat</S.CopyRight>
    </S.Container>
  );
}

export default Footer;

const S = {
  Container: styled.footer`
    width: 100%;
    height: ${({ theme }) => theme.LAYOUT.footerHeight};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    padding-bottom: 24px;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
  Wrapper: styled.div``,
  LinkText: styled.a`
    position: relative;

    padding-right: 12px;

    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
    text-decoration: none;

    &::after {
      position: absolute;
      right: 4px;
      content: '|';
    }

    &:last-of-type::after {
      content: '';
    }
  `,
  CopyRight: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
