import axios, { type InternalAxiosRequestConfig } from "axios";
import {ACCESS_TOKEN} from './constanst'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

api.interceptors.request.use(
    (config) =>  {
        if(!config.skipAuth){
            const token: string | null = localStorage.getItem(ACCESS_TOKEN)
            if (token){
                config.headers.Authorization = `JWT ${token}`
            }  
        }
        return config
    },
    (error) => {
        return Promise.reject(error
        )
    }
)

export default api