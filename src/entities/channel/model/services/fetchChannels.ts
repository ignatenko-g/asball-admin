import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChannelsUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { Channel } from '../types/types';

export const fetchChannels = createAsyncThunk<Channel[], void, ThunkConfig<string>>(
  'channels/fetchChannels',
  async (_, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.get<Channel[]>(getChannelsUrl());

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
