import * as React from 'react';
import './DataViewer.css';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import NightlightIcon from '@mui/icons-material/Nightlight';
import AirIcon from '@mui/icons-material/Air';

const theme = createTheme({
    palette: {
        primary: {
          main: '#282458db',
        }
    },
    typography: {
        h4: {
            fontWeight: 700,
            paddingBottom: 20,
            fontSize: 25,
        },
        h6: {
            fontWeight: 500,
            fontSize: 18,
            opacity: 0.7,
            marginBottom: 13,
            marginTop: 9,
        },
        h2: {
            fontWeight: 600,
            opacity: 0.9,
            marginTop: 15,
            marginBottom: 24,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 35,
        },
    },
});

const Main = styled('div')(({theme}) => ({
    color: theme.palette.primary.main,
    width: '85%',
    padding: 15,
    margin: '20px auto',
    borderRadius: 20,
    boxShadow: '20px 20px 100px #d9d9d9,-20px -20px 100px #ffffff',
}));

export default function DataViewer (props) {

    // useEffect(() => {
    //     const baseUrl = 
    // })

    return (
        <ThemeProvider theme={theme}>
            <Main>
                <Typography variant="h2"> 26 C</Typography>
                <Typography variant="h5">Location</Typography>
                <Typography variant="h6">Region , Country</Typography>
                <Divider id="divider"/>
                <Typography>Wind speed: 32 mile/hr</Typography>
                <Typography>Status: sunny</Typography>
                <Typography>other stuff</Typography>
            </Main>
            <Main>
                <Typography id="forecast" variant="h5">Weather Forecast</Typography>
                <Typography>Current temp: 26 C</Typography>
                <Typography>Wind speed: 32 mile/hr</Typography>
                <Typography>Status: sunny</Typography>
                <Typography>other stuff</Typography>
            </Main>
        </ThemeProvider>
    );
}