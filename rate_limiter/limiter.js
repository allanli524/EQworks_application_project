const redis = require('redis');
const moment = require('moment');
require('dotenv').config();

//This rate limiter uses the token bucket algorithm
//Using redis to store client and tokens
const redisClient = redis.createClient({
  host: process.env.REDISHOST,
  port: process.env.REDISPORT,
  password: process.env.REDISPASS});
//default values (interval in seconds)
const refreshInterval = 20;
const tokens = 5;

const rateLimiter = ( req, res, next ) => {
    try{
        if(!redisClient){
            throw new Error('Redis client not not found');
        }
        redisClient.get(req.ip, function(err, record) {
            if (err) throw err;
            //  if the client is not found, create new one and push to redis
            if (record == null) {
                let newRecord = {
                  refreshInterval: refreshInterval,
                  lastRefresh: moment().unix(),
                  tokens: tokens
                };
                redisClient.set(req.ip, JSON.stringify(newRecord));
                next();
            } else {

                //if client found, check if enough tokens
                let data = JSON.parse(record);
                let timeNow = moment().unix();
                let status = data.tokens > 0;

                //check if the current time window has passed
                //if time window refreshes, token is replenished
                if(timeNow - data.lastRefresh >= refreshInterval){
                  data.tokens = tokens;
                  data.lastRefresh = timeNow;
                  status = true;
                }

                
                if (!status) {
                    //if not enough token and token not replenished, error sent and denied access
                    return res.status(400).send({
                    '[ERROR]': `You have exceeded the ${tokens} requests in ${refreshInterval} seconds limit!`
                  });
                } else {
                    //if enough tokens, token - 1 and access granted
                    data.tokens = data.tokens - 1;
                }
                redisClient.set(req.ip, JSON.stringify(data));
                if(status){
                  next();
                }
            }
          });
    } catch (err) {
        next(err);
    }
}

module.exports = rateLimiter;