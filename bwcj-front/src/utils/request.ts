import axios from "axios";
import router from "@/router"; // 引入路由实例
import { TOKEN_KEY, JWT_PREFIX } from "@/const/jwt";

const baseURL = 'http://localhost:9999/'
const service = axios.create({
  baseURL
})

// service.interceptors.request.use(config => {
//   // 确保 Content-Type 设置正确
//   if (!config.headers['Content-Type']) {
//     config.headers['Content-Type'] = 'application/json;charset=UTF-8'
//   }
  
//   const token = localStorage.getItem(TOKEN_KEY)
//   if (!token) {
//     return config
//   }
//   config.headers.Authorization = JWT_PREFIX + token
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// 响应拦截器 - 处理401未授权状态
// service.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response && error.response.status === 401) {
//       // 清除本地token
//       localStorage.removeItem(TOKEN_KEY);
//       // 跳转到登录页
//       router.push('/login');
//     }
//     return Promise.reject(error);
//   }
// );

export default service