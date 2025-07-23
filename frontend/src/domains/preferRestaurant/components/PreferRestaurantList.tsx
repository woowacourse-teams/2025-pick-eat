import { RestaurantResponse } from '@apis/restaurant';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import { usePreferRestaurantContext } from '../context/PreferRestaurantProvider';

import PreferRestaurantItem from './PreferRestaurantItem';

function PreferRestaurantList() {
  const { restaurantList } = usePreferRestaurantContext();
  const itemRefs = useRef(new Map<number, HTMLDivElement>());
  const prevRects = useRef(new Map<number, DOMRect>());

  const recordPositions = () => {
    restaurantList.forEach(item => {
      const el = itemRefs.current.get(item.id);
      if (el) {
        prevRects.current.set(item.id, el.getBoundingClientRect());
      }
    });
  };

  recordPositions();

  const playFLIPAnimations = () => {
    restaurantList.forEach(item => {
      const el = itemRefs.current.get(item.id);
      const prevRect = prevRects.current.get(item.id);
      if (!el || !prevRect) return;

      const newRect = el.getBoundingClientRect();
      const dx = prevRect.left - newRect.left;
      const dy = prevRect.top - newRect.top;

      if (dx !== 0 || dy !== 0) {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = 'transform 0s';

        requestAnimationFrame(() => {
          el.style.transition = 'transform 500ms ease';
          el.style.transform = 'translate(0, 0)';
        });
      }
    });
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      playFLIPAnimations();
    });
  }, [restaurantList]);

  return (
    <S.Container>
      {restaurantList.map((item: RestaurantResponse) => (
        <S.ItemWrapper
          key={item.id}
          ref={el => {
            if (el) itemRefs.current.set(item.id, el);
          }}
        >
          <PreferRestaurantItem
            id={item.id}
            name={item.name}
            category={item.category}
            distance={item.distance}
            likeCount={item.likeCount}
          />
        </S.ItemWrapper>
      ))}
    </S.Container>
  );
}

export default PreferRestaurantList;

const S = {
  Container: styled.div`
    display: grid;
    gap: 16px;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
    padding: 16px;
  `,
  ItemWrapper: styled.div``,
};
