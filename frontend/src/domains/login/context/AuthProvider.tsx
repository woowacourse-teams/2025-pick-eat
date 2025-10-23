import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ACCESS_TOKEN_STORAGE_NAME, accessToken } from '../utils/authStorage';

interface AuthContextType {
  loggedIn: boolean;
  loading: boolean;
  loginUser: (token: string) => Promise<void>;
  logoutUser: () => void;
  hasToken: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = accessToken.get();
      if (token) {
        accessToken.save(token);
        setLoggedIn(true);
        setLoading(false);
        return;
      }
      accessToken.remove();
      setLoggedIn(false);
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_STORAGE_NAME && e.newValue !== null) {
        accessToken.save(e.newValue);
        setLoggedIn(!!e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loginUser = useCallback(
    async (token: string) => {
      accessToken.save(token);
      setLoggedIn(true);
    },
    [accessToken, setLoggedIn]
  );

  const logoutUser = useCallback(() => {
    accessToken.remove();
    setLoggedIn(false);
  }, [accessToken, setLoggedIn]);

  const hasToken = useCallback(() => {
    const token = accessToken.get();
    return !!token;
  }, [accessToken]);

  const value = {
    loggedIn,
    loading,
    loginUser,
    logoutUser,
    hasToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 는 AuthProvider 내부에서 사용해야 합니다.');
  }
  return context;
}
