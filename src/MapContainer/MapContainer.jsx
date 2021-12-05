import { useEffect, useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';

export default function MapContainer (props) {
    const [toastStatus, setToastStatus] = useState({
        open: false,
        message: ''
    });

    const [viewport, setViewport] = useState({
        latitude: 20,
        longitude: 77,
        zoom: 3,
        bearing: 0,
        pitch: 0
    });

    // const [searchResult, setSearchResult] = useState([]);

    const showError = (error) => {
        setToastStatus({
            open: true,
            message: error.message
        });
    };

    useEffect(() => {
        if (props.searchInput) {
            let locationToSearch = props.searchInput;
            locationToSearch = locationToSearch.trim().split(' ').join('%20');
            const fetchURI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationToSearch}.json?access_token=${MAPBOX_TOKEN}&worldview=in`;
            
            fetch(fetchURI)
            .then(res => res.json())
            .then(result => {
                console.log('Search result', result.features);
                // setSearchResult(result.features);
                const feature = result.features[0];
                props.setMarkerLocation({
                    longitude: parseFloat(feature.center[0]),
                    latitude: parseFloat(feature.center[1])
                });
            }).catch(err => {
                showError(err.message);
            });
        }
    }, [props.searchInput]);

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setToastStatus({
            open: false,
            message: ''
        });
    };

    const onClickOnMap = (pointerEvent) => {
        if (pointerEvent.type === 'click') {
            console.log('Pointer event on click', pointerEvent);
            props.setMarkerLocation({
                longitude: pointerEvent.lngLat[0],
                latitude: pointerEvent.lngLat[1]
            });
            props.setOpen(true);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactMapGl 
                {...viewport}
                width='100%'
                height='100%'
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle={'mapbox://styles/subhra264/ckwszma1h2e2215nv4gcm4pn3'}
                onViewportChange={setViewport}
                onError={showError}
                onClick={onClickOnMap}
            >
                
                {
                    props.markerLocation && 
                    <Marker 
                        latitude={props.markerLocation.latitude} 
                        longitude={props.markerLocation.longitude}
                    >
                        <LocationOnIcon sx={{ color: 'red' }} />
                    </Marker>
                }
                {/* {
                    searchResult.length && searchResult.map(result => (
                        <Marker 
                            latitude={parseFloat(result.center[1])}
                            longitude={parseFloat(result.center[0])}
                            key={result.id}
                        >
                            <LocationIcon
                                style={{ color: 'blue', cursor: 'pointer' }}
                                onClick={() => props.setMarkerLocation({
                                    longitude: parseFloat(result.center[0]),
                                    latitude: parseFloat(result.center[1])
                                })}
                                title={result.place_name}
                            />
                        </Marker>
                    ))
                } */}
            </ReactMapGl>
            <Snackbar
                open={toastStatus.open}
                autoHideDuration={5000}
                onClose={handleToastClose}
            >
                <Alert severity='error' onClose={handleToastClose} sx={{ width: '100%' }}>
                    {toastStatus.message || 'Oops! something went wrong!'}
                </Alert>
            </Snackbar>
        </div>
    );
}