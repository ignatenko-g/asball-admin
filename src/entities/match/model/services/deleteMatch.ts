import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMatchesUrl } from 'shared/config/apiConfig';
import { showError } from 'shared/lib/helpers/error/showError';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { matchActions } from '../slice/matchSlice';
import { Match } from '../types/types';

export const deleteMatch = createAsyncThunk<undefined, string, ThunkConfig<string>>(
  'match/deleteMatch',
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.delete<Match>(getMatchesUrl(`/${id}`));

      if (!response.data) {
        throw new Error();
      }

      dispatch(matchActions.removeMatch(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
