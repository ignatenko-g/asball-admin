import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateObjectInArray } from 'shared/lib/helpers/object/updateObjectInArray';
import { fetchMatches } from '../services/fetchMatches';
import { Match, MatchSchema } from '../types/types';

const initialState: MatchSchema = {
  matches: [],
  status: 'init',
};

const matchSlice = createSlice({
  initialState,
  name: 'match',
  reducers: {
    removeMatch(state, action: PayloadAction<Match>) {
      state.matches = state.matches.filter((match) => match.id !== action.payload.id);
    },
    addMatch(state, action: PayloadAction<Match>) {
      state.matches.push(action.payload);
    },
    updateMatch(state, action: PayloadAction<Match>) {
      const { id, ...fields } = action.payload;
      state.matches = updateObjectInArray(state.matches, id, 'id', fields);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatches.fulfilled, (state, action: PayloadAction<Match[]>) => {
        state.status = 'success';
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { actions: matchActions } = matchSlice;
export const { reducer: matchReducer } = matchSlice;
