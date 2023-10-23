import { Router } from 'express';
import cronManager from './cron-manager';
const router = Router();

router.get('/status', async (req, res) => {
  const result = await cronManager.getCronsRedis();
  result.map((cron) => {
    const now = new Date();
    cron.processingTime = Math.abs(
      now.getTime() - new Date(cron.startDate).getTime(),
    );
  });
  res.send(result);
});

export default router;
