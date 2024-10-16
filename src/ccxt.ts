import ccxt, { type Int } from "ccxt";

const exchange = new ccxt.binance();

export async function fetchCandles(symbol = 'BTC/USDT', timeframe = '5m', sinceTimestamp: Int, limit = 100) {
  try {
    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, sinceTimestamp, limit);
    return ohlcv;
  } catch (error) {
    console.log('fetchCandles error: ', error)
  }
}
