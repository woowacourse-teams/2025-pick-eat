import Button from '@components/actions/Button';
import Input from '@components/actions/Input';

import { pickeat } from '@apis/pickeat';
import { WishlistResponse } from '@apis/wishlist';

import { useGA } from '@hooks/useGA';
import { useInputAutoFocus } from '@hooks/useInputAutoFocus';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { use, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import Wishlist from './Wishlist';

type Props = {
  wishlistGroupPromise: Promise<WishlistResponse[]>;
};

function WishlistForm({ wishlistGroupPromise }: Props) {
  const initialData = use(wishlistGroupPromise);
  const [selectedWishlistId, setSelectedWishlistId] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') ?? '';
  const [pickeatName, setPickeatName] = useState('');

  const handleSelectWishlist = (id: number) => {
    setSelectedWishlistId(id);
  };

  const selectedWishlist = initialData.find(
    wishlist => wishlist.id === selectedWishlistId
  );

  const createWishPickeat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const code = await pickeat.postPickeat(roomId, pickeatName);
      await pickeat.postWish(selectedWishlistId, code);

      navigate(generateRouterPath.pickeatDetail(code));

      useGA().useGAEventTrigger({
        action: 'click',
        category: 'button',
        label: '위시 기반 픽잇 시작 버튼',
        value: 1,
      });
    } catch (e) {
      alert(e);
    }
  };

  const { inputRef } = useInputAutoFocus();

  return (
    <S.Wrapper onSubmit={createWishPickeat}>
      <Input
        name="pickeatName"
        label="픽잇 이름"
        placeholder="레전드 점심"
        ref={inputRef}
        value={pickeatName}
        onChange={e => setPickeatName(e.target.value)}
      />

      <S.WishlistWrapper>
        {initialData.map(wishlist => (
          <Wishlist
            key={wishlist.id}
            wishlist={wishlist}
            selected={wishlist.id === selectedWishlistId}
            onSelect={handleSelectWishlist}
          />
        ))}
      </S.WishlistWrapper>

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
    </S.Wrapper>
  );
}

export default WishlistForm;

const S = {
  WishlistWrapper: styled.div`
    height: 230px;
  `,

  Wrapper: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
};
