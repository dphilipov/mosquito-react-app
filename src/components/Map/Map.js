import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';



const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh',
    }

    const center = {
        lat: 51.509865,
        lng: -0.118092,
    }

    return (
        <div>
            {/* <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
            >


            </GoogleMap> */}

            <h3>Under Construction</h3>
        </div>
    )


}


export default Map