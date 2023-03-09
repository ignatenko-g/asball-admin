import { League } from 'entities/league';
import { Channel } from 'entities/channel';
import { Team } from 'entities/team';
import { Status } from 'shared/const/common';

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  top: boolean;
  date: Date;
  channel: Channel;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
  leagueId: string;
}

export interface MatchSchema {
  status: Status;
  matches: Match[];
}
