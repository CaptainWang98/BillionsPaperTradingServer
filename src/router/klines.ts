import express from "express";
import { fetchCandles } from "../ccxt.ts";
import dayjs from "dayjs";

const klinesRouter = express.Router();

klinesRouter.post('/klines', async (req, res) => {
  const ohlcv = await fetchCandles('BTC/USDT', '1m', dayjs().subtract(7, 'days').millisecond());
  console.log('ohlcv', ohlcv);
  res.status(200).send({
    ohlcv,
  })
});

export default klinesRouter;
