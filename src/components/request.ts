import axios from "axios";

const request = axios.create();

request.interceptors.response.use(function (value) {
  console.log('response from: ', value.config.url, '\ndata: ', value.data);
  return value;
});

export default request;