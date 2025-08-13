import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import ErrorMessage from '@components/errors/ErrorMessage';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { WishlistType } from '@apis/wishlist';

import { useGA } from '@hooks/useGA';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { use, useState } from 'react';
import { useNavigate } from 'react-router';

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

  const submitWishlistForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = await createPickeat(pickeatName, selectedWishlistId);
    if (code) navigate(generateRouterPath.pickeatDetail(code));

    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '위시 기반 픽잇 시작 버튼',
      value: 1,
    });
  };

  return (
    <S.Wrapper onSubmit={submitWishlistForm}>
      <Input
        name="pickeatName"
        label="픽잇 이름"
        placeholder="레전드 점심"
        autoFocus={true}
        value={pickeatName}
        onChange={e => setPickeatName(e.target.value)}
      />

      <S.WishlistWrapper>
        {data.map(wishlist => (
          <WishlistCard
            key={wishlist.id}
            wishlistData={wishlist}
            selected={wishlist.id === selectedWishlistId}
            onSelect={handleSelectWishlist}
          />
        ))}
      </S.WishlistWrapper>
      <ErrorMessage message={errorMessage} />

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
    width: 100%;
    height: 230px;
  `,

  Wrapper: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
};
