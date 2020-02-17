const NodeCache = require( "node-cache" );

let clanTTL = 60*60*24 //24 hours
let playerTTL = 60*60*1 //1 hour

const playerCache = new NodeCache({ stdTTL: playerTTL, checkperiod: playerTTL * 0.2 });
const clanCache = new NodeCache({ stdTTL: clanTTL, checkperiod: clanTTL * 0.2 });

module.exports = { playerCache, clanCache }
