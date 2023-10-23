export interface StartedCron {
  startDate: Date;
  processingTime?: number;
  name: string;
  pid: number;
}

export type StartedCrons = StartedCron[];

interface WorkerLoad {
  startedCrons: number;
}

export type WorkersLoads = { [key: number]: WorkerLoad };
