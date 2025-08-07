import { RestaurantExcludeProvider } from '@domains/restaurantExclude/context/RestaurantExcludeProvider';

import { Restaurant } from '@apis/restaurant';

import { renderHook } from '@testing-library/react';
import { isValidElement } from 'react';

import { useRestaurantTabs } from './useRestaurantTabs';

const sampleRestaurants = [
  {
    id: 1,
    name: 'Test Restaurant 1',
    tags: ['한식'],
    category: '한식',
    distance: 100,
    placeUrl: 'http://place1',
    roadAddressName: '서울시 송파구',
    likeCount: 0,
    isExcluded: false,
    x: 127.0,
    y: 37.5,
  },
  {
    id: 2,
    name: 'Test Restaurant 2',
    tags: ['양식'],
    category: '양식',
    distance: 200,
    placeUrl: 'http://place2',
    roadAddressName: '서울시 송파구',
    likeCount: 0,
    isExcluded: false,
    x: 127.01,
    y: 37.51,
  },
] as Restaurant[];

describe('useRestaurantTabs 테스트', () => {
  it('useRestaurantTabs 훅이 탭에 React 엘리먼트를 담은 객체 배열을 반환한다', () => {
    const { result } = renderHook(() => useRestaurantTabs(sampleRestaurants), {
      wrapper: ({ children }) => (
        <RestaurantExcludeProvider>{children}</RestaurantExcludeProvider>
      ),
    });

    expect(result.current).toHaveLength(5);
    expect(result.current.map(tab => tab.tab)).toEqual([
      '한식',
      '중식',
      '일식',
      '양식',
      '기타',
    ]);

    result.current.forEach(({ content }) => {
      expect(isValidElement(content)).toBe(true);
    });
  });
});
