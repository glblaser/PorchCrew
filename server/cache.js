import NodeCache from 'node-cache'

const clanTTL = 60*60*24 //24 hours: 86400 seconds
const playerTTL = 60*60*1 //1 hour: 3600 seconds
const battlelogTTL = 60*60*1 //1 hour: 3600 seconds

export const playerCache = new NodeCache({ stdTTL: playerTTL, checkperiod: playerTTL * 0.2 });
export const clanCache = new NodeCache({ stdTTL: clanTTL, checkperiod: clanTTL * 0.2 });
export const battleCache = new NodeCache({ stdTTL: battlelogTTL, checkperiod: 1 });

