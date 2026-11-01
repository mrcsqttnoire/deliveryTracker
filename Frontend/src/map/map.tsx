import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {FullscreenControl, GeolocateControl, Map, Marker} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { setWorkerUrl, type MapLayerMouseEvent} from 'maplibre-gl';
import { MapPin } from 'lucide-react';
import { useUtilities } from '../provider/CustomizedHooks';

setWorkerUrl(workerUrl);
interface MapPublicProps{
    id: string
}

export default function MapPublic({id}: MapPublicProps) {
    const {marker, setMarker} = useUtilities()

    const createMarker = (e: MapLayerMouseEvent) => {
        setMarker({
            lat: e.lngLat.lat,
            lng: e.lngLat.lng
        })
    }

    return <>
        <Map
            id = {id}
            initialViewState={{
            longitude: 47.5216,
            latitude: -18.9137,
            zoom: 15,
            }}
            style={{
                borderRadius: "12px",
            }}
            mapStyle="https://tiles.openfreemap.org/styles/bright"
            onClick={createMarker}
        >
            {/* <Marker longitude={47.5216} latitude={-18.9137}>
                <Bike></Bike>
            </Marker> */}
            <FullscreenControl
                position='bottom-right'
                style={{
                    marginBottom: "50px"
                }}
            />
            <GeolocateControl 
                position='bottom-right'
            />
            {   marker && 
                <Marker 
                    latitude={marker.lat} 
                    longitude={marker.lng}
                > 
                    <div className='p-2 bg-primary/20 rounded-full backdrop-blur-sm'>
                        <MapPin size={32} className='shrink-0 text-primary'/>
                    </div>
                </Marker>
            }
        </Map>
    </>
}