import { createSlice } from '@reduxjs/toolkit';
import { login } from '../services/login';
import { LoginSchema } from '../types/types';

const initialState: LoginSchema = {
  isLoading: false,
};

const loginSlice = createSlice({
  initialState,
  name: 'login',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
