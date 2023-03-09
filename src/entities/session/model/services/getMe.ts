import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersUrl } from 'shared/config/apiConfig';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { sessionActions } from '../slice/sessionSlice';

export interface GetMeResponse {
  accessToken: string;
}

export const getMe = createAsyncThunk<GetMeResponse, undefined, ThunkConfig<string>>(
  'session/getMe',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch, extra } = thunkAPI;

    try {
      const response = await extra.api.get<GetMeResponse>(getUsersUrl('/me'));

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.accessToken);
      dispatch(sessionActions.setIsAuth(true));

      return response.data;
    } catch (e) {
      return rejectWithValue('Произошла ошибка');
    }
  }
);
