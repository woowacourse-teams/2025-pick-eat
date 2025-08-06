import styled from "@emotion/styled";

interface KakaoLogoProps {
    width?: number | string;
}

function KakaoLogo({ width = 36 }: KakaoLogoProps) {
    return (
        <S.Container $width={width}>
            <svg
                viewBox="0 0 36 34"
                width="100%" 
                height="auto"
                fill="none"
                preserveAspectRatio="xMidYMid meet" 
            >
                <path
                    clipRule="evenodd"
                    d="M18 0.200012C8.05835 0.200012 0 6.42593 0 14.1046C0 18.8801 3.11681 23.09 7.86305 25.5939L5.86606 32.889C5.68962 33.5336 6.42683 34.0474 6.99293 33.6739L15.7467 27.8964C16.4854 27.9677 17.2362 28.0093 18 28.0093C27.9409 28.0093 35.9999 21.7836 35.9999 14.1046C35.9999 6.42593 27.9409 0.200012 18 0.200012"
                    fill="#1f1f1f"
                />
            </svg>
        </S.Container>
    );
}

export default KakaoLogo;

const S = {
    Container: styled.div<{$width: number | string}>`
        width: ${({ $width }) => (typeof $width === "number" ? `${$width}px` : $width)};
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 36/34;

        & > svg {
            width: 100%;
            height: 100%;
            display: block;
        }
    `,
};
