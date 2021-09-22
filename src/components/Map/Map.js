import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import style from './Map.module.css';
import mapStyles from './mapStyles';
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';

// const MAPS_API_KEY = "Insert your API key here"

const Map = () => {
    const [markers, setMarkers] = useState([]);

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }

    const mapContainerStyle = {
        width: '100vw',
        height: 'calc(100vh - 87px)',
    }

    const center = {
        lat: 42.765833,
        lng: 25.238611,
    }

    const icon = {
        url: "/map_pin_icon.svg.png",
    }

    let history = useHistory();

    useEffect(() => {

        let user = authServices.getUserData('user')

        postServices.getProfileActivity(user.uid)
            .then(activitiesData => {
                setMarkers(activitiesData);
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || MAPS_API_KEY}
        >
            <div className={style.map}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={8}
                    center={center}
                    options={options}
                >
                    {markers.length > 0
                        ? markers.map((marker) => {

                            const { id, lat, lng, title } = marker;

                            return (
                                <Marker
                                    key={id}
                                    position={
                                        {
                                            lat,
                                            lng
                                        }
                                    }
                                    icon={icon}
                                    title={title}
                                    animation={2}
                                    onClick={(e) => history.push(`/article/${id}`)}
                                />
                            )

                        })
                        : null
                    }

                </GoogleMap>

            </div>
        </LoadScript>
    )


}


export default Map