import { useState, useEffect } from 'react';
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
            fontWeight: 900,
            marginTop: 15,
            marginBottom: 22,
            marginRight: 10,
            marginLeft: 10,
            fontSize: 20,
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
        h3: {
            fontWeight: 600,
            opacity: 0.9,
            marginTop: 15,
            marginBottom: 24,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 25
        },
        body1: {
            fontWeight: 600,
            padding: '3px 12px',
            fontSize: 14,
        }
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

const airQualityIndex = [
    "Good",
    "Moderate",
    "Unhealthy for sensitive group",
    "Unhealthy",
    "Very Unhealthy",
    "Hazardous",
]

export default function DataViewer (props) {
    const baseUrl = 'http://api.weatherapi.com/v1';
    const [currentResult, setCurrentResult] = useState(null);
    const [foreCastResult, setResultForeCast] = useState(null);
    const [historyResult, setResultHistory] = useState(null);

    useEffect(() => {
        if (props.markerLocation) {
            let currentUrl = baseUrl + '/current.json';
            let primaryQuery = `?key=${process.env.REACT_APP_WEATHER_TOKEN}&q=${props.markerLocation.latitude},${props.markerLocation.longitude}`;
            currentUrl += `${primaryQuery}&aqi=yes`;
            fetch(currentUrl)
            .then((res) => res.json())
            .then(result => {
                console.log("current", result);
                setCurrentResult(result);

                let forecastUrl = baseUrl + '/forecast.json';
                forecastUrl += primaryQuery + '&aqi=yes&days=2';
                console.log("forecastUrl ", forecastUrl);

                fetch(forecastUrl)
                .then((res) => res.json())
                .then(resultForecast => {
                    console.log("forecast", resultForecast);
                    setResultForeCast(resultForecast);

                    let historyUrl = baseUrl + '/history.json';
                    historyUrl += primaryQuery + '&dt=2021-12-02';
                    console.log("historyUrl ", historyUrl);

                    fetch(historyUrl)
                    .then(res=> res.json())
                    .then(resultHistory => {
                        console.log("history result", resultHistory);
                        setResultHistory(resultHistory);

                    }).catch(err => console.log("history error:", err))
                }).catch(err=> console.log("forecast error:", err))
            }).catch(err => console.log("error:", err))
        }
    }, [props.markerLocation])

    return (
        <ThemeProvider theme={theme}>
            <Main>
                {currentResult? (
                    <>
                        <Typography variant="h2">{currentResult.current.temp_c}&deg;C</Typography>
                        <Typography variant="h6">{currentResult.current.is_day? "Day": "Night"}</Typography>
                        <Typography variant="h5">{currentResult.location.name}</Typography>
                        <Typography variant="h6">{currentResult.location.reion} , {currentResult.location.country}</Typography>
                        <Divider id="divider"/>
                        <Typography>Wind speed: <span className="value">{currentResult.current.wind_mph} mph</span></Typography>
                        <Typography>Wind direction: <span className="value">{currentResult.current.wind_dir}</span></Typography>
                        <Typography>Wind degree: <span className="value">{currentResult.current.wind_degree}</span></Typography>
                        <Typography>Last Update: <span className="value">{currentResult.current.last_updated}</span></Typography>
                        <Typography>Humidity: <span className="value">{currentResult.current.humidity} %</span></Typography>
                        <Typography variant="h4">Air Quality</Typography>
                        <Divider id="devider2"/>
                        <Typography>CO level: <span className="value">{currentResult.current.air_quality.co.toFixed(2)} μg/m3</span></Typography>
                        <Typography>NO2 level: <span className="value">{currentResult.current.air_quality.no2.toFixed(2)} μg/m3</span></Typography>
                        <Typography>O3 level: <span className="value">{currentResult.current.air_quality.o3.toFixed(2)} μg/m3</span></Typography>
                        <Typography>SO2 level: <span className="value">{currentResult.current.air_quality.so2.toFixed(2)} μg/m3</span></Typography>
                        <Typography>CO level: <span className="value">{currentResult.current.air_quality.co.toFixed(2)} μg/m3</span></Typography>
                        <Typography>Air Quality status: <span className="value">{airQualityIndex[currentResult.current.air_quality["us-epa-index"]-1]}</span></Typography>
                    </>
                ): ''}
            </Main>
            <Main>
                <Typography id="forecast" variant="h3">Weather Forecast</Typography>
                {foreCastResult && foreCastResult.forecast.forecastday.map((day_, index) => (
                    <>
                        <Typography  variant="h4">{index? "Day after tomorrow": "Tomorrow"}</Typography>
                        <Typography>Date: <span className="value">{day_.date}</span></Typography>
                        <Typography>Sunrise: <span className="value">{day_.astro.sunrise}</span></Typography>
                        <Typography>Sunset: <span className="value">{day_.astro.sunset}</span></Typography>
                        <Typography>Moonrise: <span className="value">{day_.astro.moonrise}</span></Typography>
                        <Typography>Moonset: <span className="value">{day_.astro.moonset}</span></Typography>
                        <Typography>Moon phase: <span className="value">{day_.astro.moon_phase}</span></Typography>
                        <Typography>Moon illumination: <span className="value">{day_.astro.moon_illumination}</span></Typography>
                        <Divider id={"divider"+3+index} />
                        <Typography>Condition: <span className="value">{day_.day.condition.text}</span></Typography>
                        <Typography>Average humidity: <span className="value">{day_.day.avghumidity} %</span></Typography>
                        <Typography>Average temperature: <span className="value">{day_.day.avgtemp_c}&deg;C</span></Typography>
                        <Typography>Maximum temperature: <span className="value">{day_.day.maxtemp_c}&deg;C</span></Typography>
                        <Typography>Minimum temperature: <span className="value">{day_.day.mintemp_c}&deg;C</span></Typography>
                        <Typography>Chance of raining: <span className="value">{day_.day.daily_chance_of_rain} </span></Typography>
                        <Typography>Chance of snowing: <span className="value">{day_.day.daily_chance_of_snow}</span></Typography>
                        <Typography>Will it rain?: <span className="value">{day_.day.daily_will_it_rain? "yes": "no"}</span></Typography>
                        <Typography>Will it snow?: <span className="value">{day_.day.daily_will_it_snow? "yes": "no"}</span></Typography>
                        <Typography>Max Wind Speed: <span className="value">{day_.day.maxwind_mph} mph</span></Typography>
                    </>
                ))}
            </Main>
            <Main>
                {historyResult? (
                    <>
                        <Typography  variant="h4">Yesterday</Typography>
                        <Typography>Sunrise: <span className="value">{historyResult.forecast.forecastday[0].astro.sunrise}</span></Typography>
                        <Typography>Sunset: <span className="value">{historyResult.forecast.forecastday[0].astro.sunset}</span></Typography>
                        <Typography>Moonrise: <span className="value">{historyResult.forecast.forecastday[0].astro.moonrise}</span></Typography>
                        <Typography>Moonset: <span className="value">{historyResult.forecast.forecastday[0].astro.moonset}</span></Typography>
                        <Typography>Moon phase: <span className="value">{historyResult.forecast.forecastday[0].astro.moon_phase}</span></Typography>
                        <Typography>Moon illumination: <span className="value">{historyResult.forecast.forecastday[0].astro.moon_illumination}</span></Typography>
                        <Divider id="divider5" />
                        <Typography>Condition: <span className="value">{historyResult.forecast.forecastday[0].day.condition.text}</span></Typography>
                        <Typography>Average humidity: <span className="value">{historyResult.forecast.forecastday[0].day.avghumidity} %</span></Typography>
                        <Typography>Average temperature: <span className="value">{historyResult.forecast.forecastday[0].day.avgtemp_c}&deg;C</span></Typography>
                        <Typography>Maximum temperature: <span className="value">{historyResult.forecast.forecastday[0].day.maxtemp_c}&deg;C</span></Typography>
                        <Typography>Minimum temperature: <span className="value">{historyResult.forecast.forecastday[0].day.mintemp_c}&deg;C</span></Typography>
                        <Typography>Chance of raining: <span className="value">{historyResult.forecast.forecastday[0].day.daily_chance_of_rain} </span></Typography>
                        <Typography>Chance of snowing: <span className="value">{historyResult.forecast.forecastday[0].day.daily_chance_of_snow}</span></Typography>
                        <Typography>Will it rain?: <span className="value">{historyResult.forecast.forecastday[0].day.daily_will_it_rain? "yes": "no"}</span></Typography>
                        <Typography>Will it snow?: <span className="value">{historyResult.forecast.forecastday[0].day.daily_will_it_snow? "yes": "no"}</span></Typography>
                        <Typography>Max Wind Speed: <span className="value">{historyResult.forecast.forecastday[0].day.maxwind_mph} mph</span></Typography>
                    </>
                ): ''}
            </Main>
        </ThemeProvider>
    );
}