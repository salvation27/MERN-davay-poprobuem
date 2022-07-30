import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:1234/api",
});
// при каждом запросе делать проверку токена
instance.interceptors.request.use(config=>{
    config.headers.Authorization = window.localStorage.getItem('token')
    return config;
})

export default instance;