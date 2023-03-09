import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateObjectInArray } from 'shared/lib/helpers/object/updateObjectInArray';
import { fetchTeams } from '../services/fetchTeams';
import { Team, TeamSchema } from './../types/types';

const initialState: TeamSchema = {
  status: 'init',
  teams: [],
};

const teamSlice = createSlice({
  initialState,
  name: 'team',
  reducers: {
    removeTeam(state, action: PayloadAction<Team>) {
      state.teams = state.teams.filter((team) => team.id !== action.payload.id);
    },
    addTeam(state, action: PayloadAction<Team>) {
      state.teams.push(action.payload);
    },
    updateTeam(state, action: PayloadAction<Team>) {
      const { id, ...fields } = action.payload;
      state.teams = updateObjectInArray(state.teams, id, 'id', fields);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.status = 'success';
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { actions: teamActions } = teamSlice;
export const { reducer: teamReducer } = teamSlice;
