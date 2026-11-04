import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {FullscreenControl, GeolocateControl, Map} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { setWorkerUrl} from 'maplibre-gl';
import type { ReactNode } from 'react';

setWorkerUrl(workerUrl);
interface MapPublicProps{
    id: string
    rotate?: boolean
    children: ReactNode
}

export default function MapSuivi({id, rotate=false, children}: MapPublicProps) {

    return <>
        <Map
            id = {id}
            initialViewState={{
                longitude: 47.5216,
                latitude: -18.9137,
                zoom: 16,
                pitch: 85,
                bearing: -20
                
            }}
            dragRotate={rotate}
            style={{
                borderRadius: "12px",
            }}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
        >
            <FullscreenControl
                position='top-right'
            />
            <GeolocateControl 
                position='top-right'
            />
            {children}
        </Map>
    </>
}