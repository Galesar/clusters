import { sleep } from '@src/utils/sleep';
import cluster from 'cluster';
import bogosort from 'random-sort';

export async function pentagonHack() {
  console.log(`Worker with id ${cluster.worker.id} started the pentagon hack`);
  await sleep(10);
  console.log(
    `Worker with id ${cluster.worker.id} the pentagon hack is processing: 20%`,
  );
  await sleep(20);
  console.log(
    `Worker with id ${cluster.worker.id} the pentagon hack is processing: 60%`,
  );
  await sleep(30);
  console.log(
    `Worker with id ${cluster.worker.id} the pentagon hack is processing: 99%`,
  );
  await sleep(60);
  console.log(`Worker with id ${cluster.worker.id} the pentagon hack is over.`);

  return `Worker with id ${cluster.worker.id} the pentagon hack is over.`;
}

export async function giveMeThatJob() {
  console.log(`Worker with id ${cluster.worker.id} started the giveMeThatJob`);
  await sleep(120);
  console.log(`Worker with id ${cluster.worker.id} end the giveMeThatJob`);
  return `Worker with id ${cluster.worker.id} end the giveMeThatJob`;
}

export async function randomSort() {
  const arr = [1, 24, 5, 51, 1, 2, 4, 1, 2, 4, 5, 100, 12, 10];
  const result = bogosort(arr);
  return result;
}

export async function job1() {
  await sleep(120);
  return true;
}

export async function job2() {
  await sleep(129);
  return true;
}

export async function job3() {
  await sleep(140);
  return true;
}

export async function job4() {
  await sleep(120);
  return true;
}

export async function job5() {
  await sleep(130);
  return true;
}

export async function job6() {
  await sleep(140);
  return true;
}

export async function job7() {
  await sleep(149);
  return true;
}
