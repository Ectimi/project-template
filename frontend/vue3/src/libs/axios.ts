import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const instance = axios.create({
  baseURL: isDev ? 'http://localhost:3000/xxx' : 'http://xxxxx',
  timeout: 10000,
  withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers = {
      'x-requested-with': '',
      authorization: '',
    };
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // 你的业务数据
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    const { response } = error;
    if (response) {
      
    }

    return Promise.reject(error);
  },
);

export default instance;