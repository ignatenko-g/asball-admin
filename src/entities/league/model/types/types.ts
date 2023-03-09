import { Status } from 'shared/const/common';

export interface League {
  id: string;
  name: string;
}

export interface LeagueSchema {
  status: Status;
  leagues: League[];
}
