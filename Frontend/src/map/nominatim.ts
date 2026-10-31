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