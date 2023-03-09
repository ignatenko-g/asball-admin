import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMatchesUrl } from 'shared/config/apiConfig';
import { errorCatch } from 'shared/lib/helpers/api/errorCatch';
import { showError } from 'shared/lib/helpers/error/showError';
import { Match } from '../types/types';
import { matchActions } from '../slice/matchSlice';

interface CreateMatchProps {
  homeTeamId: string;
  awayTeamId: string;
  top: boolean;
  date: Date;
  channelId: string;
  leagueId: string;
}

export const createMatch = createAsyncThunk<undefined, CreateMatchProps, ThunkConfig<string>>(
  'match/createMatch',
  async (formValues, thunkAPI) => {
    const { rejectWithValue, dispatch, extra } = thunkAPI;

    try {
      const response = await extra.api.post<Match>(getMatchesUrl(), formValues);

      if (!response.data) {
        throw new Error();
      }

      dispatch(matchActions.addMatch(response.data));
    } catch (e) {
      showError(errorCatch(e));
      return rejectWithValue('Произошла ошибка');
    }
  }
);
