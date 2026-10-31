import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {Map} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {setWorkerUrl} from 'maplibre-gl';

setWorkerUrl(workerUrl);

// maplibregl.setWorkerUrl(workerUrl)
export function MapComponent() {
  return <Map
  
    initialViewState={{
      longitude: 47.543085,
      latitude: -18.925857,
      zoom: 17,
    }}
    style={{width: 1250, height: 600}}
    mapStyle="https://tiles.openfreemap.org/styles/bright"
  />;
}