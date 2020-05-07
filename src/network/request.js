import axios from 'axios';

export function request(config) {

  //创建一个axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.23.23:8000/api/n3',
    timeout: 5000
  });

  //添加请求拦截器
  instance.interceptors.request.use(config => {
    return config;
  }, error => {
    console.log(error);
  });

  //添加相应拦截器
  instance.interceptors.response.use(rs => {
    return rs.data;
  }, error => {
    console.log(error);
  });

  //返回一个Promise
  return instance(config);

}
