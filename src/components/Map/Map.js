// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { useState, useEffect, useContext } from 'react';
import style from './Map.module.css';

// Context
import AuthContext from '../../context/authContext';

import postServices from '../../services/postServices';
import L from 'leaflet';
import icon from './map-pin.png';


const Map = ({ history }) => {
    const user = useContext(AuthContext)

    const [markers, setMarkers] = useState([]);

    const center = {
        lat: 42.765833,
        lng: 25.238611,
    }

    const markerIcon = new L.Icon({
        iconUrl: icon,
        iconAnchor: [15, 42],
    });

    useEffect(() => {
        if (!user.info.uid) return;
        
        postServices.getProfileVisitedPlaces(user.info.uid)
            .then(activitiesData => {
                setMarkers(activitiesData);
            })
            .catch(err => console.log(err))
    }, [user.info.uid])

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