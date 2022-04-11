export enum Events {
  LEAVE = 'leave',
  ON_LEAVE = 'on-leave',
  JOIN = 'join',
  ON_JOIN = 'on-join',
  GET_PLAYERS = 'get-players',
  ON_GET_PLAYERS = 'on-get-players',
}

export interface ClientState {
  username?: string;
}
