import { Status } from 'shared/const/common';

export interface Team {
  id: string;
  name: string;
  images: {
    small: string;
    medium: string;
    main: string;
  };
  leagueId: string;
}

export interface TeamSchema {
  status: Status;
  teams: Team[];
}
