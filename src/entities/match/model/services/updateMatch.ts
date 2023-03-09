import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMatchesUrl } from 'shared/config/apiConfig';
import { Match } from 'entities/match';
import { showError } from 'shared/lib/helpers/error/showError';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { matchActions } from '../slice/matchSlice';

interface UpdateMatchProps {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  top: boolean;
  date: Date;
  channelId: string;
  leagueId: string;
}

export const updateMatch = createAsyncThunk<undefined, UpdateMatchProps, ThunkConfig<string>>(
  'match/updateMatch',
  async (matchData, thunkAPI) => {
    const { dispatch, rejectWithValue, extra } = thunkAPI;

    try {
      const { id, ...fields } = matchData;

      const response = await extra.api.patch<Match>(getMatchesUrl(`/${id}`), fields);

      if (!response.data) {
        throw new Error();
      }

      dispatch(matchActions.updateMatch(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
