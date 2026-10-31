import axios from "axios";

export const osm_api = axios.create({
    baseURL: import.meta.env.VITE_OSM_URL_NOMINATIM
})

osm_api.interceptors.request.use(
    async (config) => {
        // config.headers['User-Agent'] = `DeliveryTracker/1.0 (${import.meta.env.VITE_MON_CONTACT})`
        config.params = {
            format: 'geojson',
            email: import.meta.env.VITE_MON_CONTACT,
            ...config.params
        }
        // await new Promise((r)=>setTimeout(r,  1200))
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export type coordoneeType = {
    country_code: string
    country: string
    city: string
    postcode: string
    state: string
    suburb: string
    neighbourhood: string
    road: string
}
