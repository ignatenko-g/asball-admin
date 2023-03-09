import { AxiosInstance } from 'axios';
import { ChannelSchema } from 'entities/channel';
import { LeagueSchema } from 'entities/league';
import { MatchSchema } from 'entities/match';
import { SessionSchema } from 'entities/session';
import { TeamSchema } from 'entities/team';
import { LoginSchema } from 'features/auth/loginForm';

export interface StateSchema {
  login: LoginSchema;
  session: SessionSchema;
  league: LeagueSchema;
  team: TeamSchema;
  channel: ChannelSchema;
  match: MatchSchema;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  state: StateSchema;
  rejectValue: T;
  extra: ThunkExtraArg;
}
