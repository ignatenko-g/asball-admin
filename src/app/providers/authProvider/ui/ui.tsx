import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMe, getSessionStatus } from 'entities/session';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const sessionStatus = useSelector(getSessionStatus);

  if (sessionStatus === 'loading') {
    return <div>Загрузка...</div>;
  }

  return <>{(sessionStatus === 'success' || sessionStatus === 'error') && children}</>;
};
