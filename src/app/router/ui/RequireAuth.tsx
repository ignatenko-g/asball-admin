import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuth } from 'entities/session';
import { RoutePath } from 'shared/config/routeConfig';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);

  if (!isAuth) {
    return <Navigate to={RoutePath.signin} state={{ from: location }} replace />;
  }

  return children;
};
