import axios from "axios"
import { toast } from 'react-toastify'

const instanceAxios = axios.create();
instanceAxios.defaults.baseURL = process.env.REACT_APP_URL;
instanceAxios.interceptors.request.use(function (config) {
    config.timeout = 8500;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

instanceAxios.interceptors.response.use(function (response) {    
    return response;
  }, function (error,) {
    if(error.response.data.hasError)
      toast.error(error.response.data.message) 
    return Promise.reject(error);
  });
  export default instanceAxios;