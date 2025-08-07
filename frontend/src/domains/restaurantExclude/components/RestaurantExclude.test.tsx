import { Restaurant } from '@apis/restaurant';
import * as restaurantsModule from '@apis/restaurants';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';

import { ThemeProvider } from '@emotion/react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { RestaurantExcludeProvider } from '../context/RestaurantExcludeProvider';

import RestaurantExclude from './RestaurantExclude';

const sampleRestaurants: Restaurant[] = [
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

const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('RestaurantExclude 크로스 버튼 및 제외 제출 통합 테스트', () => {
  const patchMock = jest
    .spyOn(restaurantsModule.restaurants, 'patch')
    .mockResolvedValue(sampleRestaurants[0]);

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(restaurantsModule.restaurants, 'get')
      .mockResolvedValue(sampleRestaurants);
  });

  it('크로스 버튼 클릭 시 selectedRestaurantIds에 id가 추가되고 제외 버튼 클릭 시 서버에 제출 및 네비게이션 호출', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ThemeProvider theme={THEME}>
            <RestaurantExcludeProvider>
              <RestaurantExclude
                restaurantsPromise={restaurantsModule.restaurants.get(
                  'testCode'
                )}
              />
            </RestaurantExcludeProvider>
          </ThemeProvider>
        </MemoryRouter>
      );
    });

    for (const r of sampleRestaurants) {
      expect(screen.getByText(r.name)).toBeInTheDocument();
    }

    const crossBtn = screen.getByLabelText(
      `소거: ${sampleRestaurants[0].name}`
    );
    await act(async () => fireEvent.click(crossBtn));

    const nextButton = screen.getByLabelText(`제외 식당 제출`);
    await act(async () => fireEvent.click(nextButton));

    await waitFor(() => {
      expect(patchMock).toHaveBeenCalledTimes(1);
      expect(patchMock).toHaveBeenCalledWith(expect.arrayContaining([1]));
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(`^${ROUTE_PATH.PREFER_RESTAURANT}`))
    );
  });
});
