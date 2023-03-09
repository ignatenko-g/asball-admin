import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps } from 'shared/config/routeConfig';
import { MyLayout } from 'widgets/layout';
import { routerConfig } from '../config/config';
import { PublicOnly } from './PublicOnly';
import { RequireAuth } from './RequireAuth';

export const AppRouter: FC = () => {
  const renderWithWrapper = (route: AppRouteProps) => {
    const element = <Suspense fallback={<div>Загрузка...</div>}>{route.element}</Suspense>;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>{element}</RequireAuth>
          ) : route.publicOnly ? (
            <PublicOnly>{element}</PublicOnly>
          ) : (
            element
          )
        }
      />
    );
  };

  return (
    <Routes>
      <Route element={<MyLayout />}>{Object.values(routerConfig).map(renderWithWrapper)}</Route>
    </Routes>
  );
};
