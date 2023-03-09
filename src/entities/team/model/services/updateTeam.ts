import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTeamsUrl } from 'shared/config/apiConfig';
import { showError } from 'shared/lib/helpers/error/showError';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { teamActions } from '../slice/teamSlice';
import { Team } from '../types/types';

interface UpdateTeamProps {
  id: string;
  name: string;
  leagueId: string;
}

export const updateTeam = createAsyncThunk<undefined, UpdateTeamProps, ThunkConfig<string>>(
  'team/updateTeam',
  async (teamData, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;

    try {
      const { id, ...fields } = teamData;

      const response = await extra.api.patch<Team>(getTeamsUrl(`/${id}`), fields);

      if (!response.data) {
        throw new Error();
      }

      dispatch(teamActions.updateTeam(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
