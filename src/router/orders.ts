import express, { Response } from "express";
import { fetchCandles } from "../ccxt.ts";
import dayjs from "dayjs";
import { prismaClient } from "../db.ts";

const ordersRouter = express.Router();

ordersRouter.post('/create_order', async (req, res: Response, next) => {
  const { session, user } = res.locals;
  // const username: string | null = req.body.username ?? null;

  const order = await prismaClient.order.findFirst({
    where: {
      userId: user.id,
    }
  });
  console.log('order', order);

  res.status(200).send({
    code: 0,
    msg: '',
  })
});

ordersRouter.post('/get_order', async (req, res) => {
  const ohlcv = await fetchCandles('BTC/USDT', '1m', dayjs().subtract(7, 'days').millisecond());
  console.log('ohlcv', ohlcv);
  res.status(200).send({
    ohlcv,
  })
});

export default ordersRouter;
