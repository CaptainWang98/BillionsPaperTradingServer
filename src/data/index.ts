import dayjs from "dayjs";
import coinApi from "../coinApi"
import { prismaClient } from "../db";

export function getOhlcv(
  period: string,
  time_period_start: string,
  time_period_end?: string,
  symbol = 'BTC/USDT',
) {
  // prismaClient.ohlcv.findMany({
  //   where: {
  //     period,
  //     time_period_start: {
  //       lte: new Date(time_period_start)
  //     }
  //   }
  // })
  return coinApi.getOhlcv(period, time_period_start, time_period_end);
};

export async function createOrder(
  userId: string,
  orderType: string,
  orderAmount: number,
  orderPrice?: number
) {
  const existingOrder = await prismaClient.order.findFirst({
    where: {
      userId,
      OR: [{
        status: 'fullfilled'
      }, {
        status: 'hanging'
      }]
    }
  });

  if (existingOrder) return false;

  return prismaClient.order.create({
    data: {
      userId,
      symbol: 'BTC/USDT',
      status: 'hanging',
      orderType,
      orderAmount,
      orderPrice,
    }
  })
};
