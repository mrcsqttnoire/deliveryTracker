import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {Map} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {setWorkerUrl} from 'maplibre-gl';

setWorkerUrl(workerUrl);

// maplibregl.setWorkerUrl(workerUrl)
export function MapPublic() {
  return <>
    <Map
        id='map_public'
        initialViewState={{
        longitude: 47.5216,
        latitude: -18.9137,
        zoom: 15,
        }}
        style={{width: 1250, height: 600}}
        mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
    </Map>
  </>
}