import axios from "config/axiosConfig.js";

export const loginApi = (obj)=>{
    return axios.post("auth/login",obj)
}