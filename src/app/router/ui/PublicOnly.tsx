import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuth } from 'entities/session';
import { RoutePath } from 'shared/config/routeConfig';

interface PublicOnlyProps {
  children: JSX.Element;
}

export const PublicOnly: FC<PublicOnlyProps> = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to={RoutePath.leagues} state={{ from: location }} replace />;
  }

  return children;
};
