import { osm_api } from "./customMapHook"

export async function getDetailsPos(latitude: string, longitude: string): Promise<string> {
  try {
    if (!latitude.trim() || !longitude.trim()) {
      console.log("donner un lat et lon")
      return ""
    }

    const res = await osm_api.get("reverse", {
      params: { lat: latitude, lon: longitude },
    })

    const adrs = res.data?.features?.[0]?.properties?.address
    if (!adrs) return ""

    return adrs.suburb ?? adrs.neighbourhood ?? adrs.road ?? adrs.city ?? adrs.state ?? ""
  } catch (err) {
    console.log(err)
    return ""
  }
}

export type Suggestion = { lat: number; lng: number; nom: string }

export async function suggere(q: string): Promise<Suggestion[]> {
    const url = new URL("https://photon.komoot.io/api/")
    url.searchParams.set("q", q)
    url.searchParams.set("limit", "5")
    url.searchParams.set("bbox", "43.2,-25.6,50.5,-11.9") 
    url.searchParams.set("lat", "-18.91")                
    url.searchParams.set("lon", "47.52")
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    return data.features.map((f: any) => ({
        lng: f.geometry.coordinates[0],
        lat: f.geometry.coordinates[1],
        nom: [f.properties.name, f.properties.city].filter(Boolean).join(", "),
    }))
}

