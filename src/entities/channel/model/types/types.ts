import { Status } from 'shared/const/common';

export interface Channel {
  id: string;
  name: string;
  link: string;
}

export interface ChannelSchema {
  status: Status;
  channels: Channel[];
}
