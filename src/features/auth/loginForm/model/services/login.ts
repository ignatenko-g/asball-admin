import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionActions } from 'entities/session';
import { getUsersUrl } from 'shared/config/apiConfig';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { showError } from 'shared/lib/helpers/error/showError';

export interface LoginProps {
  username: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
};

export const login = createAsyncThunk<LoginResponse, LoginProps, ThunkConfig<string>>(
  'login/login',
  async (authData, thunkAPI) => {
    const { rejectWithValue, dispatch, extra } = thunkAPI;

    try {
      const response = await extra.api.post<LoginResponse>(getUsersUrl('/login'), authData);

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.accessToken);
      dispatch(sessionActions.setIsAuth(true));

      return response.data;
    } catch (e) {
      showError('Неверный логин или пароль');
      return rejectWithValue('Неверный логин или пароль');
    }
  }
);
