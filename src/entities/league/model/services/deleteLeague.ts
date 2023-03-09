import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaguesUrl } from 'shared/config/apiConfig';
import { showError } from 'shared/lib/helpers/error/showError';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { leagueActions } from '../slice/leagueSlice';
import { League } from '../types/types';

export const deleteLeague = createAsyncThunk<undefined, string, ThunkConfig<string>>(
  'league/deleteLeague',
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.delete<League>(getLeaguesUrl(`/${id}`));

      if (!response.data) {
        throw new Error();
      }

      dispatch(leagueActions.removeLeague(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
