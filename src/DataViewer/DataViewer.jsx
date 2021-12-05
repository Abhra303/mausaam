import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          main: '#282458db',
        }
    }
});

const Main = styled('div')(({theme}) => ({
    backgroundColor: '#e0e0e0',
    color: theme.palette.primary.main,
}));

export default function DataViewer (props) {

    return (
        <ThemeProvider theme={theme}>
            <Main>
                <Typography variant="h4">Location Name</Typography>
                <Typography variant="h5">Region , Country</Typography>
                <Divider />
                <Typography>Current temp: 26 C</Typography>
                <Typography>Wind speed: 32 mile/hr</Typography>
                <Typography>Status: sunny</Typography>
                <Typography>other stuff</Typography>
                <Typography vairant="h5">Weather Forecast</Typography>
                <Divider />
                <Typography>Current temp: 26 C</Typography>
                <Typography>Wind speed: 32 mile/hr</Typography>
                <Typography>Status: sunny</Typography>
                <Typography>other stuff</Typography>
            </Main>
        </ThemeProvider>
    );
}