import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {FullscreenControl, GeolocateControl, Map, Marker} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { setWorkerUrl} from 'maplibre-gl';
import { useUtilities } from '../provider/CustomizedHooks';
import { LivraisonIci } from './pin_marker';

setWorkerUrl(workerUrl);
interface MapPublicProps{
    id: string
}

export default function MapSuivi({id}: MapPublicProps) {
    const {marker} = useUtilities()

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
            dragRotate={false}
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
            {   marker && 
                <Marker 
                    latitude={marker.lat} 
                    longitude={marker.lng}
                    anchor="bottom"
                > 
                    <LivraisonIci/>
                </Marker>
            }
        </Map>
    </>
}