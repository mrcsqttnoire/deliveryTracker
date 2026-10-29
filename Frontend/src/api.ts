import axios from "axios";
import {ACCESS_TOKEN, REFRESH_TOKEN} from './constanst'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
    retried?: boolean;
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

api.interceptors.response.use(
    (response) => response,   

    async (error) => {
        const request = error.config
        // console.log("okk")

        if (
            !request ||
            error.response?.status !== 401 ||
            request.retried ||
            request.url?.includes("/auth/jwt/refresh/") ||
            request.url?.includes("/auth/jwt/create/")
        ) {
            return Promise.reject(error);
        }

        request.retried = true
        try{
            const refreshed = await refreshToken();
            if (!refreshed){
                return Promise.reject(error)
            }
            const token: string | null = localStorage.getItem(ACCESS_TOKEN)
            request.headers.Authorization = `JWT ${token}`
            return api(request)

        } catch (err) {
            return Promise.reject(err);
        }

    }
)

const refreshToken = async () => {
        const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post(
                "/auth/jwt/refresh/", 
                {'refresh' : refreshToken},
                { skipAuth: true }
            )
            if (res.status !== 200){return false}
            // console.log("refresh")
            localStorage.setItem(ACCESS_TOKEN, res.data.access) 
            return true

        } catch (e) {
            console.log(e)
            return false
        }
    }

export default api
