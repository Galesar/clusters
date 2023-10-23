import redis from '@src/redis';
import userService from './users.service';
import kue from 'kue';

export const balanceQueue = kue.createQueue(redis);

export async function balanceProcessing(job, done) {
  try {
    const result = await userService.updateBalance(
      job.data.userId,
      job.data.value,
    );
    done(null, result.dataValues);
  } catch (error) {
    done(error);
  }
}
