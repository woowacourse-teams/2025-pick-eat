import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

interface RestaurantExcludeContextInterface {
  selectedRestaurantIds: string[];
  handleRestaurantToggle: (restaurantId: string) => void;
  handleRestaurantSetPush: (restaurantIds: string[]) => void;
  handleRestaurantSelection: (restaurantIds: string[]) => void;
  handleRestaurantSelectionDelete: (restaurantIds: string[]) => void;
  handleRestaurantSelectionToggle: (restaurantIds: string[]) => void;
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

  const handleRestaurantSetPush = useCallback(
    (restaurantIds: string[]) => {
      setSelectedRestaurantIds(prev => {
        const newIds = [...prev, ...restaurantIds];
        return Array.from(new Set(newIds));
      });
    },
    [setSelectedRestaurantIds]
  );

  const handleRestaurantSelection = useCallback(
    (restaurantIds: string[]) => {
      setSelectedRestaurantIds(restaurantIds);
    },
    [setSelectedRestaurantIds]
  );

  const handleRestaurantSelectionDelete = useCallback(
    (restaurantIds: string[]) => {
      setSelectedRestaurantIds(prev =>
        prev.filter(id => !restaurantIds.includes(id))
      );
    },
    [setSelectedRestaurantIds]
  );

  const handleRestaurantSelectionToggle = useCallback(
    (restaurantIds: string[]) => {
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
      'useRestaurantExcludeContext 는 RestaurantExcludeProvider 안에서 사용해주세요.'
    );
  }
  return context;
};
