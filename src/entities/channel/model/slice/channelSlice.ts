import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateObjectInArray } from 'shared/lib/helpers/object/updateObjectInArray';
import { fetchChannels } from '../services/fetchChannels';
import { Channel, ChannelSchema } from '../types/types';

const initialState: ChannelSchema = {
  channels: [],
  status: 'init',
};

const channelSlice = createSlice({
  initialState,
  name: 'channel',
  reducers: {
    addChannel(state, action: PayloadAction<Channel>) {
      state.channels.push(action.payload);
    },
    removeChannel(state, action: PayloadAction<Channel>) {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload.id);
    },
    updateChannel(state, action: PayloadAction<Channel>) {
      const { id, ...fields } = action.payload;
      state.channels = updateObjectInArray(state.channels, id, 'id', fields);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChannels.fulfilled, (state, action: PayloadAction<Channel[]>) => {
        state.status = 'success';
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { actions: channelActions } = channelSlice;
export const { reducer: channelReducer } = channelSlice;
