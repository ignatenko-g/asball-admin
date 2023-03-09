import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaguesUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { leagueActions } from '../slice/leagueSlice';
import { League } from '../types/types';

interface UpdateLeagueProps {
  id: string;
  name: string;
}

export const updateLeague = createAsyncThunk<undefined, UpdateLeagueProps, ThunkConfig<string>>(
  'league/updateLeague',
  async (leagueData, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;

    try {
      const { id, ...fields } = leagueData;

      const response = await extra.api.patch<League>(getLeaguesUrl(`/${id}`), fields);

      if (!response.data) {
        throw new Error();
      }

      dispatch(leagueActions.updateLeague(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
