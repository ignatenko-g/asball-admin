import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChannelsUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { channelActions } from '../slice/channelSlice';
import { Channel } from '../types/types';

export const deleteChannel = createAsyncThunk<undefined, string, ThunkConfig<string>>(
  'channel/deleteChannel',
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.delete<Channel>(getChannelsUrl(`/${id}`));

      if (!response.data) {
        throw new Error();
      }

      dispatch(channelActions.removeChannel(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
