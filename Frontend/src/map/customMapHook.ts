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

export type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export function getUserLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("La géolocalisation n'est pas supportée par votre navigateur."));
    }

    const options: PositionOptions = {
      enableHighAccuracy: true, // Demande une précision maximale (GPS si disponible)
      timeout: 5000,            // Temps d'attente maximum en millisecondes
      maximumAge: 0             // Ne pas utiliser de position en cache
    };

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error: GeolocationPositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("L'utilisateur a refusé la demande de géolocalisation."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Les informations de position ne sont pas disponibles."));
            break;
          case error.TIMEOUT:
            reject(new Error("La demande pour obtenir la position a expiré."));
            break;
          default:
            reject(new Error("Une erreur inconnue est survenue."));
            break;
        }
      },
      options
    );
  });
}