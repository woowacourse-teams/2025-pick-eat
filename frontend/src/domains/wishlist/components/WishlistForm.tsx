import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import Enter from '@components/assets/icons/Enter';
import ErrorMessage from '@components/errors/ErrorMessage';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { WishlistType } from '@apis/wishlist';

import { useGA } from '@hooks/useGA';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { use, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import useCreateWishPickeat from '../hooks/useCreateWishPickeat';
import useSelectWishlist from '../hooks/useSelectWishlist';

import WishlistCard from './WishlistCard';

type Props = {
  wishlistGroupPromise: Promise<WishlistType[]>;
};

function WishlistForm({ wishlistGroupPromise }: Props) {
  const data = use(wishlistGroupPromise);
  const [pickeatName, setPickeatName] = useState(makePickeatName);
  const { selectedWishlistId, handleSelectWishlist, selectedWishlist } =
    useSelectWishlist(data);
  const { createPickeat, errorMessage } = useCreateWishPickeat();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') ?? '';

  const submitWishlistForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = await createPickeat(pickeatName, selectedWishlistId);
    if (code) navigate(generateRouterPath.pickeatDetail(code));

    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '찜 기반 픽잇 시작 버튼',
      value: 1,
    });
  };

  return (
    <S.Wrapper onSubmit={submitWishlistForm}>
      {data.length > 0 && (
        <Input
          name="pickeatName"
          label="픽잇 이름"
          placeholder="레전드 점심"
          autoFocus={true}
          value={pickeatName}
          onChange={e => setPickeatName(e.target.value)}
        />
      )}

      <S.WishlistWrapper>
        {data.map(wishlist => (
          <WishlistCard
            key={wishlist.id}
            wishlistData={wishlist}
            selected={wishlist.id === selectedWishlistId}
            onSelect={handleSelectWishlist}
          />
        ))}

        {!data.length && (
          <S.Text>
            찜 목록이 없어요😥
            <br />
            방으로 이동하여 찜 목록을 생성해 주세요.
          </S.Text>
        )}
      </S.WishlistWrapper>
      <ErrorMessage message={errorMessage} />

      {data.length ? (
        <Button
          text={
            selectedWishlistId
              ? `${selectedWishlist?.name} 픽잇 시작`
              : '픽잇 시작하기'
          }
          color="primary"
          disabled={!selectedWishlistId || !pickeatName}
          type="submit"
        />
      ) : (
        <Button
          text="방으로 이동"
          leftIcon={<Enter size="xs" color="white" />}
          onClick={() =>
            navigate(generateRouterPath.roomDetail(Number(roomId)))
          }
        />
      )}
    </S.Wrapper>
  );
}

export default WishlistForm;

const S = {
  Wrapper: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  WishlistWrapper: styled.div`
    width: 100%;
    height: 230px;
    overflow: scroll;
  `,

  Text: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.large};
  `,
};
