import * as redis from 'redis';
import * as bluebird from 'bluebird';

export default ():any => {
  const promiseRedis = bluebird.promisifyAll(redis)
  const client = promiseRedis.createClient()
  return client
};
