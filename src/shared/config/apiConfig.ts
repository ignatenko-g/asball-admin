export const API_URL = process.env.REACT_APP_SERVER_URL + '/api';

export const getLeaguesUrl = (string = '') => `/league${string}`;
export const getTeamsUrl = (string = '') => `/team${string}`;
export const getChannelsUrl = (string = '') => `/channel${string}`;
export const getMatchesUrl = (string = '') => `/match${string}`;
export const getUsersUrl = (string = '') => `/user${string}`;
