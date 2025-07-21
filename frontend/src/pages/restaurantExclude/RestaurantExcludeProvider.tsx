import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

interface RestaurantExcludeContextInterface {
  selectedRestaurantIds: string[];
  handleRestaurantToggle: (restaurant: string) => void;
  handleRestaurantSelection: (restaurants: string[]) => void;
}

const RestaurantExcludeContext =
  createContext<RestaurantExcludeContextInterface | null>(null);

export const RestaurantExcludeProvider = ({ children }: PropsWithChildren) => {
  const [selectedRestaurantIds, setSelectedRestaurantIds] = useState<string[]>(
    []
  );

  const handleRestaurantToggle = useCallback(
    (restaurantId: string) => {
      setSelectedRestaurantIds(prev => {
        if (prev.includes(restaurantId)) {
          return prev.filter(r => r !== restaurantId);
        } else {
          return [...prev, restaurantId];
        }
      });
    },
    [setSelectedRestaurantIds]
  );

  const handleRestaurantSelection = useCallback(
    (restaurants: string[]) => {
      setSelectedRestaurantIds(restaurants);
    },
    [setSelectedRestaurantIds]
  );

  return (
    <RestaurantExcludeContext.Provider
      value={{
        selectedRestaurantIds,
        handleRestaurantToggle,
        handleRestaurantSelection,
      }}
    >
      {children}
    </RestaurantExcludeContext.Provider>
  );
};

export const useRestaurantExcludeContext = () => {
  const context = useContext(RestaurantExcludeContext);
  if (!context) {
    throw new Error(
      'useRestaurantExcludeContext 는 RestaurantExcludeProvider 안에서 사용해주세요.'
    );
  }
  return context;
};
