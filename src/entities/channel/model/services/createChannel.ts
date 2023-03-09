import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChannelsUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { channelActions } from '../slice/channelSlice';
import { Channel } from '../types/types';

interface СreateChannelProps {
  name: string;
  link: string;
}

export const createChannel = createAsyncThunk<undefined, СreateChannelProps, ThunkConfig<string>>(
  'channel/createChannel',
  async (formValues, thunkAPI) => {
    const { rejectWithValue, dispatch, extra } = thunkAPI;

    try {
      const response = await extra.api.post<Channel>(getChannelsUrl(), formValues);

      if (!response.data) {
        throw new Error();
      }

      dispatch(channelActions.addChannel(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
