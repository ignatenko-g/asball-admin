import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMe } from '../services/getMe';
import { SessionSchema } from '../types/types';

const initialState: SessionSchema = {
  status: 'init',
  isAuth: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMe.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(getMe.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;
