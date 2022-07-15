import Request from 'umi-request';
import { message } from 'antd';
import { getStorage } from './storage';
import { removeStorage } from './storage';

const controller = new AbortController(); // 创建一个控制器
const { signal } = controller; // 返回一个 AbortSignal 对象实例，它可以用来 with/abort 一个 DOM 请求。

signal.addEventListener('abort', () => {
  console.log('aborted!');
});

Request.extendOptions({
  prefix:
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:7001/bookmark'
      : 'http://124.223.24.47:7001/bookmark',
  signal,
});

Request.use(async (ctx, next) => {
  ctx.req.options = {
    ...ctx.req.options,
    headers: {
      ...ctx.req.options.headers,
      authorization: getStorage('access_token') || '',
    },
  };
  
  await next();

  const { res } = ctx;
  const { success, message: msg } = res;
  if (!success) {
    // if(msg === "token已过期，请重新登录"){
    //   removeStorage('access_token')
    //   removeStorage("user")
    // }
    message.error(msg);
  }
});

export default Request;
