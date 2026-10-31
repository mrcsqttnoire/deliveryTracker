import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {Map} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {setWorkerUrl} from 'maplibre-gl';

setWorkerUrl(workerUrl);

// maplibregl.setWorkerUrl(workerUrl)
export default function MapPublic() {
  return <>
    <Map
        id='map_public'
        initialViewState={{
        longitude: 47.5216,
        latitude: -18.9137,
        zoom: 15,
        }}
        style={{
            width: "100%", 
            height: "100%",
            borderRadius: "12px",
        }}
        mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
    </Map>
  </>
}