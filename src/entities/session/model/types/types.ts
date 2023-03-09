import { Status } from 'shared/const/common';

export type SessionSchema = {
  status: Status;
  isAuth: boolean;
};
