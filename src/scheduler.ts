import { Cron } from "croner";

export function scheduleJobs() {
  const fiveMinsJob = new Cron("* 5 * * * *");
};

const checkFillOrder = async () => {
  // Check Orders
};
