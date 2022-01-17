import axios from "config/axiosConfig.js";

export const getBooksApi = ()=>{
    return axios.get("books")
}