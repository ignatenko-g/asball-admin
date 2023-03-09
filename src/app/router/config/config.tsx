import { SignInPage } from 'pages/auth';
import { ChannelsPage } from 'pages/channels';
import { LeaguesPage } from 'pages/leagues';
import { MatchesPage } from 'pages/matches';
import { TeamsPage } from 'pages/teams';
import { AppRouteProps, AppRoutes, RoutePath } from 'shared/config/routeConfig';

export const routerConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.SIGNIN]: {
    path: RoutePath.signin,
    element: <SignInPage />,
    publicOnly: true,
  },
  [AppRoutes.MATCHES]: {
    path: RoutePath.matches,
    element: <MatchesPage />,
    authOnly: true,
  },
  [AppRoutes.CHANNELS]: {
    path: RoutePath.channels,
    element: <ChannelsPage />,
    authOnly: true,
  },
  [AppRoutes.LEAGUES]: {
    path: RoutePath.leagues,
    element: <LeaguesPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <SignInPage />,
    publicOnly: true,
  },
  [AppRoutes.TEAMS]: {
    path: RoutePath.teams,
    element: <TeamsPage />,
    authOnly: true,
  },
};
