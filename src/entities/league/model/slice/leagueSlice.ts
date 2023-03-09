import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateObjectInArray } from 'shared/lib/helpers/object/updateObjectInArray';
import { LeagueSchema, League } from './../types/types';
import { fetchLeagues } from '../services/fetchLeagues';

const initialState: LeagueSchema = {
  leagues: [],
  status: 'init',
};

const leagueSlice = createSlice({
  initialState,
  name: 'league',
  reducers: {
    addLeague(state, action: PayloadAction<League>) {
      state.leagues.push(action.payload);
    },
    removeLeague(state, action: PayloadAction<League>) {
      state.leagues = state.leagues.filter((league) => league.id !== action.payload.id);
    },
    updateLeague(state, action: PayloadAction<League>) {
      const { id, ...fields } = action.payload;
      state.leagues = updateObjectInArray(state.leagues, id, 'id', fields);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeagues.fulfilled, (state, action: PayloadAction<League[]>) => {
        state.status = 'success';
        state.leagues = action.payload;
      })
      .addCase(fetchLeagues.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { actions: leagueActions } = leagueSlice;
export const { reducer: leagueReducer } = leagueSlice;
