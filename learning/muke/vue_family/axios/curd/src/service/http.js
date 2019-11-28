import axios from 'axios';
import service from './contactApi';
import { Toast } from 'vant';

// service 循环遍历输出不同的请求方法
let instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1000,
});

const Http = {}; // 请求方法

for (const key in service) {
  let api = service[key];

  // 避免进入回调地狱`async`

  // 请求格式的统一/参数的统一
  Http[key] = async function(params, isFormData = false, config = {}) {
    let url = api.url;
    let newParams = {};

    // content-type `form-data or json`
    if (params && isFormData) {
      newParams = new FormData();
      for (const key in params) {
        newParams.append(key, params[key]);
      }
    } else {
      newParams = params;
    }

    let response;
    // 不同请求的判断
    if (
      api.method === 'put' ||
      api.method === 'post' ||
      api.method === 'patch'
    ) {
      try {
        response = await instance[api.method](url, newParams, config);
      } catch (err) {
        response = err;
      }
    } else if (api.method === 'delete' || api.method === 'get') {
      try {
        config.params = newParams;
        response = await instance[api.method](url, config);
      } catch (err) {
        response = err;
      }
    }
    return response;
  };
}

//拦截器的添加器

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    //请求前做些什么
    Toast.loading({
      mask: false,
      duration: 0, // 一直存在
      forbidClick: true, // 禁止点击
      message: '加载中',
    });
    return config;
  },
  () => {
    Toast.clear();
    Toast('请求失败,请重试');
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 请求成功
    Toast.clear();
    return res.data;
  },
  () => {
    // 请求错误
    Toast.clear();
    Toast('请求失败,请重试');
  },
);

export default Http;
