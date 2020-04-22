import axios from 'axios'

// 后台接口的基础地址
const BASE_URL = 'http://api-haoke-dev.itheima.net';
// 创建axios的实例
const myAxios = axios.create({
  baseURL: BASE_URL
});

// 注册拦截器（request和response）

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log('开始请求：', config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('请求成功了', response)
  const _res = {
    status: response.data.status,
    description: response.data.description,
    data: response.data.body
  }
  return _res;
  // return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export { BASE_URL }
export default myAxios
