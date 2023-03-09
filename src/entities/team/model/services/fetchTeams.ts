import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTeamsUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { Team } from '../types/types';

export const fetchTeams = createAsyncThunk<Team[], void, ThunkConfig<string>>(
  'teams/fetchTeams',
  async (_, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.get<Team[]>(getTeamsUrl());

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
