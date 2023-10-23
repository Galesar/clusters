import { Router } from 'express';
import { balanceQueue } from './users.queues';
import { UserQueues } from './constants/queues.enum';
const router = Router();

router.post('/update-balance', (req, res) => {
  try {
    const body = req.body;

    const job = balanceQueue
      .create(UserQueues.BALANCE_PROCESSING, body)
      .removeOnComplete(true)
      .save((err) => {
        if (err) {
          res.status(400).send("The user's balance cannot be less than 0");
        }

        job.on('complete', (result) => {
          res.send(`${result.email} | balance: ${result.balance}`);
        });

        job.on('failed', (result) => {
          res.send(result);
        });
      });
  } catch (error) {
    res.status(400).send("The user's balance cannot be less than 0");
  }
});

export default router;
