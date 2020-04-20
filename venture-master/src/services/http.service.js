import axios from 'axios';
import a from '../common/constans';

const http = axios.create({
  baseURL: a.API_PATH,
});

/** http response interceptor */
http.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // console.log(error.response.data);

    return Promise.reject(error.response.data);
  },
);

export { http };
