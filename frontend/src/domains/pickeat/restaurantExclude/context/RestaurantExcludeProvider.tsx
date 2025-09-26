import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

interface RestaurantExcludeContextInterface {
  selectedRestaurantIds: number[];
  handleRestaurantToggle: (restaurantId: number) => void;
  handleRestaurantSetPush: (restaurantIds: number[]) => void;
  handleRestaurantSelection: (restaurantIds: number[]) => void;
  handleRestaurantSelectionDelete: (restaurantIds: number[]) => void;
  handleRestaurantSelectionToggle: (restaurantIds: number[]) => void;
}

const RestaurantExcludeContext =
  createContext<RestaurantExcludeContextInterface | null>(null);

export const RestaurantExcludeProvider = ({ children }: PropsWithChildren) => {
  const [selectedRestaurantIds, setSelectedRestaurantIds] = useState<number[]>(
    []
  );

  const handleRestaurantToggle = useCallback(
    (restaurantId: number) => {
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

  const handleRestaurantSetPush = useCallback(
    (restaurantIds: number[]) => {
      setSelectedRestaurantIds(prev => {
        const newIds = [...prev, ...restaurantIds];
        return Array.from(new Set(newIds));
      });
    },
    [setSelectedRestaurantIds]
  );

  const handleRestaurantSelection = useCallback(
    (restaurantIds: number[]) => {
      setSelectedRestaurantIds(restaurantIds);
    },
    [setSelectedRestaurantIds]
  );

  const handleRestaurantSelectionDelete = useCallback(
    (restaurantIds: number[]) => {
      setSelectedRestaurantIds(prev =>
        prev.filter(id => !restaurantIds.includes(id))
      );
    },
    [setSelectedRestaurantIds]
  );

  const handleRestaurantSelectionToggle = useCallback(
    (restaurantIds: number[]) => {
      setSelectedRestaurantIds(prev => {
        const prevSet = new Set(prev);
        restaurantIds.forEach(id => {
          if (prevSet.has(id)) {
            prevSet.delete(id);
          } else {
            prevSet.add(id);
          }
        });
        return Array.from(prevSet);
      });
    },
    [setSelectedRestaurantIds]
  );

  return (
    <RestaurantExcludeContext.Provider
      value={{
        selectedRestaurantIds,
        handleRestaurantToggle,
        handleRestaurantSetPush,
        handleRestaurantSelection,
        handleRestaurantSelectionDelete,
        handleRestaurantSelectionToggle,
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
      'useRestaurantExcludeContext 는 RestaurantExcludeProvider 안에서 사용해 주세요.'
    );
  }
  return context;
};
