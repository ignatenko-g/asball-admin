import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChannelsUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { channelActions } from '../slice/channelSlice';
import { Channel } from '../types/types';

interface UpdateChannelProps {
  id: string;
  name: string;
  link: string;
}

export const updateChannel = createAsyncThunk<undefined, UpdateChannelProps, ThunkConfig<string>>(
  'channel/updateChannel',
  async (channelData, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;

    try {
      const { id, ...fields } = channelData;

      const response = await extra.api.patch<Channel>(getChannelsUrl(`/${id}`), fields);

      if (!response.data) {
        throw new Error();
      }

      dispatch(channelActions.updateChannel(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
