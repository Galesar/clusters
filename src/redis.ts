import { createClient } from 'redis';
import config from '@configs/main';

const redis = createClient({
  url: config.redisURL,
  socket: { connectTimeout: 60000, timeout: 60000 },
});

export default redis;
