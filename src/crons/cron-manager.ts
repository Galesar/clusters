import {
  StartedCron,
  StartedCrons,
  WorkersLoads,
} from './types/cron-manager.types';
import * as jobs from './jobs';
import cluster from 'cluster';
import { CronExpression } from './constants/cron-expression.enum';
import { CronJob } from 'cron';
import redis from '@src/redis';
import { Cron } from '@db/models/crons.model';

class CronManager {
  private startedCrons: StartedCrons = [];
  private workersLoad: WorkersLoads = {};
  private readonly model = Cron;

  registerWorker(id: number): void {
    this.workersLoad[id] = {
      startedCrons: 0,
    };
    console.log(`Cron manager: worker with id ${id} was register`);
  }

  registerCron({
    interval,
    jobName,
  }: {
    interval: CronExpression;
    jobName: string;
  }): void {
    const cron = new CronJob(
      interval,
      () => {
        if (cluster.isPrimary) {
          this.primaryStartJob(jobName);
        }
      },
      null,
      true,
    );
    cron.start();
  }

  primaryStartJob(jobName: string): void {
    if (!this.isJobInProcess(jobName)) {
      const workerId = this.selectWorker();
      const worker = cluster.workers[workerId];
      this.startedCrons.push({
        pid: worker.id,
        name: jobName,
        startDate: new Date(),
      });
      this.workersLoad[workerId].startedCrons++;
      this.updateCronsRedis();
      worker.send({ cmd: jobName });
    }
  }

  async updateCronsRedis(): Promise<void> {
    try {
      await redis.set('startedCrons', JSON.stringify(this.startedCrons));
    } catch (error) {
      console.log('redis error: ', error);
    }
  }

  async getCronsRedis(): Promise<StartedCrons> {
    const crons = await redis.get('startedCrons');
    return JSON.parse(crons);
  }

  async workerStartJob(jobName: string): Promise<void> {
    const result = await jobs[jobName]();
    cluster.worker.send({ cmd: jobName, result });
  }

  isJobInProcess(jobName: string): StartedCron {
    return this.startedCrons.find((cron) => cron.name === jobName);
  }

  selectWorker(): string {
    let resultedPid: string = '1';
    let lessValue: number = undefined;

    for (const key in this.workersLoad) {
      const worker = this.workersLoad[key];
      if (lessValue === undefined) lessValue = worker.startedCrons;
      if (worker.startedCrons <= lessValue) {
        resultedPid = key;
        lessValue = worker.startedCrons;
      }
    }

    return resultedPid;
  }

  deleteJobFromList(jobName: string, workerId: number, result: unknown) {
    const job = this.startedCrons.find((job) => job.name === jobName);
    this.saveResult(job, result);
    const index = this.startedCrons.findIndex((job) => job.name === jobName);
    this.startedCrons.splice(index, 1);
    this.workersLoad[workerId].startedCrons--;
    this.updateCronsRedis();
  }

  saveResult(data: StartedCron, result: unknown): void {
    this.model.create({
      startDate: data.startDate,
      result: result,
      name: data.name,
      processingTime: Math.abs(new Date().getTime() - data.startDate.getTime()),
    });
  }

  initCrons(): void {
    this.registerCron({
      interval: CronExpression.EVERY_5_SECONDS,
      jobName: jobs.pentagonHack.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_5_SECONDS,
      jobName: jobs.giveMeThatJob.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_5_MINUTES,
      jobName: jobs.randomSort.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_30_SECONDS,
      jobName: jobs.job1.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_SECOND,
      jobName: jobs.job2.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_MINUTE,
      jobName: jobs.job3.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_10_SECONDS,
      jobName: jobs.job4.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_MINUTE,
      jobName: jobs.job5.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_5_MINUTES,
      jobName: jobs.job6.name,
    });

    this.registerCron({
      interval: CronExpression.EVERY_5_SECONDS,
      jobName: jobs.job7.name,
    });
  }
}

export default new CronManager();
