import { useState } from 'react';
import ReactMapGl from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
console.log('MAPBOX_TOKEN', MAPBOX_TOKEN);

export default function MapContainer (props) {
    const [toastStatus, setToastStatus] = useState({
        open: false,
        message: ''
    });

    const [viewport, setViewport] = useState({
        latitude: 20,
        longitude: 77,
        zoom: 3,
        bearing: 360,
        pitch: 0
    });

    const showError = (error) => {
        setToastStatus({
            open: true,
            message: error.message
        });
    };

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setToastStatus({
            open: false,
            message: ''
        });
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
            />
            <Snackbar
                open={toastStatus.open}
                autoHideDuration={5000}
                onClose={handleToastClose}
            >
                <Alert severity='error' onClose={handleToastClose} sx={{ width: '100%' }}>
                    {toastStatus.message}
                </Alert>
            </Snackbar>
        </div>
    );
}