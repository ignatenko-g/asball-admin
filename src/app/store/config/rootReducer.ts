import { ReducersMapObject } from '@reduxjs/toolkit';
import { channelReducer } from 'entities/channel';
import { leagueReducer } from 'entities/league';
import { matchReducer } from 'entities/match';
import { sessionReducer } from 'entities/session';
import { teamReducer } from 'entities/team';
import { loginReducer } from 'features/auth/loginForm';
import { StateSchema } from './types';

export const rootReducers: ReducersMapObject<StateSchema> = {
  login: loginReducer,
  session: sessionReducer,
  league: leagueReducer,
  team: teamReducer,
  channel: channelReducer,
  match: matchReducer,
};
