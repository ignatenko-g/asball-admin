import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaguesUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { leagueActions } from '../slice/leagueSlice';
import { League } from '../types/types';

interface СreateLeagueProps {
  name: string;
}

export const createLeague = createAsyncThunk<undefined, СreateLeagueProps, ThunkConfig<string>>(
  'league/createLeague',
  async (formValues, thunkAPI) => {
    const { rejectWithValue, dispatch, extra } = thunkAPI;

    try {
      const response = await extra.api.post<League>(getLeaguesUrl(), formValues);

      if (!response.data) {
        throw new Error();
      }

      dispatch(leagueActions.addLeague(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
