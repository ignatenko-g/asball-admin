import { configureStore } from '@reduxjs/toolkit';
import { api } from 'shared/api/api';
import { rootReducers } from './rootReducer';
import { ThunkExtraArg } from './types';

const extraArg: ThunkExtraArg = {
  api,
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
