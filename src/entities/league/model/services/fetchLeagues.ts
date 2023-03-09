import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaguesUrl } from 'shared/config/apiConfig';
import { showError } from 'shared/lib/helpers/error/showError';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { League } from '../types/types';

export const fetchLeagues = createAsyncThunk<League[], void, ThunkConfig<string>>(
  'leagues/fetchLeagues',
  async (_, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.get<League[]>(getLeaguesUrl());

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
