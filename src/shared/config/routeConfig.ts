import { RouteProps } from 'react-router-dom';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  publicOnly?: boolean;
};

export enum AppRoutes {
  MATCHES = 'matches',
  SIGNIN = 'signin',
  LEAGUES = 'leagues',
  TEAMS = 'teams',
  CHANNELS = 'channels',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.SIGNIN]: '/',
  [AppRoutes.LEAGUES]: '/leagues',
  [AppRoutes.TEAMS]: '/teams',
  [AppRoutes.CHANNELS]: '/channels',
  [AppRoutes.MATCHES]: '/matches',
  [AppRoutes.NOT_FOUND]: '*',
};
