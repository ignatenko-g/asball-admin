import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMatchesUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { Match } from '../types/types';

export const fetchMatches = createAsyncThunk<Match[], void, ThunkConfig<string>>(
  'teams/fetchMatches',
  async (_, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.get<Match[]>(getMatchesUrl());

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
