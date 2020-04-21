import axios from 'axios'

// 后台接口的基础地址
const BASE_URL = 'http://localhost:8080';
// 创建axios的实例
const myAxios = axios.create({
  baseURL: BASE_URL
});

// 注册拦截器（request和response）

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export { BASE_URL }
export default myAxios
