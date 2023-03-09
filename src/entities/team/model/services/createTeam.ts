import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTeamsUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { teamActions } from '../slice/teamSlice';
import { Team } from '../types/types';

export const createTeam = createAsyncThunk<undefined, FormData, ThunkConfig<string>>(
  'team/createTeam',
  async (formValues, thunkAPI) => {
    const { rejectWithValue, dispatch, extra } = thunkAPI;

    try {
      const response = await extra.api.post<Team>(getTeamsUrl(), formValues);

      if (!response.data) {
        throw new Error();
      }

      dispatch(teamActions.addTeam(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
