// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import style from './Map.module.css';
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';
import L from 'leaflet';
import icon from './map-pin.png';


const Map = () => {
    const [markers, setMarkers] = useState([]);

    let history = useHistory();

    const center = {
        lat: 42.765833,
        lng: 25.238611,
    }

    const markerIcon = new L.Icon({
        iconUrl: icon,
        iconAnchor: [15, 42],
    });

    useEffect(() => {

        let user = authServices.getUserData('user')

        postServices.getProfileActivity(user.uid)
            .then(activitiesData => {
                setMarkers(activitiesData);
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <MapContainer
            className={style.map}
            center={center}
            zoom={8}
            scrollWheelZoom={true}
            doubleClickZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map(marker => {
                return (
                    <Marker
                        position={[marker.lat, marker.lng]}
                        key={marker.id}
                        icon={markerIcon}
                        eventHandlers={
                            {
                                click: () => {
                                    history.push(`/article/${marker.id}`)
                                },
                            }
                        }
                    >
                        <Tooltip direction="bottom" opacity={1}>
                            {marker.title}
                        </Tooltip>
                    </Marker>

                )
            })}

        </MapContainer>
    )


}


export default Map