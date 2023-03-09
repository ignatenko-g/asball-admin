import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTeamsUrl } from 'shared/config/apiConfig';
import { showError } from 'shared/lib/helpers/error/showError';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { teamActions } from '../slice/teamSlice';
import { Team } from '../types/types';

export const deleteTeam = createAsyncThunk<undefined, string, ThunkConfig<string>>(
  'team/deleteTeam',
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;

    try {
      const response = await extra.api.delete<Team>(getTeamsUrl(`/${id}`));

      if (!response.data) {
        throw new Error();
      }

      dispatch(teamActions.removeTeam(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
