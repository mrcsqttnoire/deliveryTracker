import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {FullscreenControl, GeolocateControl, Map, Marker} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { setWorkerUrl, type MapLayerMouseEvent} from 'maplibre-gl';
import { useUtilities } from '../provider/CustomizedHooks';
import { PinPointer } from './pin_marker';

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
            zoom: 16,
            pitch: 70,
            }}
            minPitch={50}
            style={{
                borderRadius: "12px",
            }}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
            onClick={createMarker}
        >
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
                    anchor='bottom'
                    draggable
                    onDragEnd={(e) => setMarker({ lat: e.lngLat.lat, lng: e.lngLat.lng })}
                >     
                    <PinPointer/>
                </Marker>
            }
        </Map>
    </>
}