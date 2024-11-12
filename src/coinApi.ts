import { AxiosResponse } from "axios";
import request from "./components/request";

interface OHLCV {
  time_period_start?: string
  time_period_end?: string
  time_open?: string
  time_close?: string
  price_open?: number
  price_high?: number
  price_low?: number
  price_close?: number
  volume_traded: number
  trades_count: number
}

function getOhlcv(period_id: string, time_start: string, time_end?: string, limit = 100, include_empty_items = true, symbol_id = 'BINANCE_SPOT_BTC_USDT'): OHLCV[] {
  return request.request<any, AxiosResponse<OHLCV, any>>({
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://rest.coinapi.io/v1/ohlcv/${symbol_id}/history`,
    headers: { 
      'Accept': 'text/plain', 
      'X-CoinAPI-Key': '74615075-BC30-4D7C-8210-BDC3D152FBD0'
    },
    params: {
      period_id,
      time_start,
      time_end,
      limit,
      include_empty_items,
    }
  })
  .then((response) => {
    console.log('coinApi getOhlcv rsp', response.data);
    return response;
  })
  .catch((error) => {
    console.log('coinApi getOhlcv err', error);
  });
}

export default {
  getOhlcv,
}