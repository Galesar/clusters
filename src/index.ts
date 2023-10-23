import config from '@configs/main';
import db from '@db/index';
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import os from 'os';
import { balanceProcessing, balanceQueue } from '@users/users.queues';
import { UserQueues } from '@users/constants/queues.enum';
import cronManager from '@crons/cron-manager';
import redis from './redis';

db.connectionManager.initPools();

const app = express();
const port = config.port;
redis.connect();

app.use((req, res, next) => {
  if (cluster.isWorker) {
    console.log(
      `Worker: ${cluster.worker.id}: ${req.method} | ${
        req.url
      } | ${new Date().toISOString()}`,
    );
  } else {
    console.error('Request in primary process');
    process.exit(0);
  }
  next();
});

app.use(bodyParser.json());

app.use('/users', routes.userRouter);
app.use('/crons', routes.cronRouter);

if (cluster.isPrimary) {
  balanceQueue.process(UserQueues.BALANCE_PROCESSING, balanceProcessing);
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
    cronManager.registerWorker(i + 1);
  }
  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.id} finished. Exit code: ${code}`);

    app.listen(port, () => console.log(`Worker ${cluster.worker.id} launched`));
  });

  cronManager.initCrons();

  cluster.on('message', (worker, msg) => {
    cronManager.deleteJobFromList(msg.cmd, worker.id, msg.result);
  });
} else {
  app.listen(port, () => {
    console.log(
      `Worker ${cluster.worker.id} was successfull started on the port: ${config.port}`,
    );
  });
  cluster.worker.on('message', (msg) => {
    console.log(`Cluster ${cluster.worker.id} received the message`, msg);
    cronManager.workerStartJob(msg.cmd);
  });
}
