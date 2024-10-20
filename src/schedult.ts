import { Cron } from "croner";
import { exchange } from "./ccxt";
import { ORIGIN_TIMESTAMP, START_TIMESTAMP, SYMBOL } from "./vars";

function realtimePriceJob() {
  return new Cron('*/3 * * * * *', async () => {
    const CURRENT_TIMESTAMP = Date.now() - START_TIMESTAMP + ORIGIN_TIMESTAMP;
    const currentOhlcv = await exchange.fetchOHLCV(SYMBOL, '1s', CURRENT_TIMESTAMP, 1);
    // TODO: 遍历已开订单 - send订单状态
    // TODO: 检查 hanging 订单
  });
};

export function schedult() {
  
};
