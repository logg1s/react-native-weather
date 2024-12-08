import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Home } from "./pages/Home/Home";
import { ImageBackground } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationGeocodedAddress,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { CoordinatesType } from "./utils/types/coordinate";
import { fetchCoordsByCity, fetchWeatherDetailByCoords } from "./api/meteo";
import { useFonts } from "expo-font";
import { WeatherDetailsType } from "./utils/types/weatherDetailsType";
import Forecast from "./pages/Forecast/Forecast";
import { isValidNumber } from "./utils/validate";

export enum SCREEN {
  HOME,
  FORECAST,
}

export default function App() {
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    latitude: 21.6127483,
    longitude: 105.83958,
  });
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetailsType>();
  const [locationDetails, setLocationDetails] =
    useState<LocationGeocodedAddress>();
  const isFirstRender = useRef<boolean>(true);
  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });
  const [currentScreen, setCurrentScreen] = useState<SCREEN>(SCREEN.HOME);
  async function getCurrentLocation() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.Highest,
        mayShowUserSettingsDialog: true,
      });
      setCoordinates({
        latitude: location?.coords?.latitude ?? 0,
        longitude: location?.coords?.longitude ?? 0,
      });
    } else {
      alert("Please restart app and grant location permission !");
    }
  }

  async function getAllData() {
    if (!coordinates) {
      return;
    }
    try {
      const fetchedWeatherDetails = await fetchWeatherDetailByCoords(
        coordinates
      );
      const locationDetails = await reverseGeocodeAsync(coordinates);
      if (!fetchedWeatherDetails) {
        throw new Error("Data fetching failed");
      }

      setWeatherDetails(fetchedWeatherDetails);
      setLocationDetails(locationDetails[0]);
    } catch (error) {
      console.error(error);
      alert(
        "An unexpected error occurred! Please restart the app or contact to developer"
      );
    }
  }

  useEffect(() => {
    if (isFirstRender?.current) {
      isFirstRender.current = false;
      getCurrentLocation();
      return;
    }

    getAllData();
  }, [coordinates]);

  function goToScreen(screen: SCREEN) {
    setCurrentScreen(screen);
  }

  async function findCoordsByCity(city: string) {
    try {
      const { latitude, longitude }: CoordinatesType = await fetchCoordsByCity(
        city
      );
      if (isValidNumber(latitude) && isValidNumber(longitude)) {
        setCoordinates({ latitude, longitude });
      }
    } catch (err) {
      alert("Your city couldn't be found !");
    }
  }

  function renderOnScreen() {
    switch (currentScreen) {
      case SCREEN.FORECAST:
        return (
          <Forecast
            locationDetails={locationDetails}
            weatherDetails={weatherDetails}
            onPressBack={goToScreen}
          />
        );
      default:
        return (
          <Home
            weatherDetails={weatherDetails}
            locationDetails={locationDetails}
            onPressRefreshAddress={getCurrentLocation}
            onPressTemperature={goToScreen}
            onSubmitCity={findCoordsByCity}
            coords={coordinates}
          />
        );
    }
  }
  return (
    <ImageBackground
      source={require("./assets/background.png")}
      style={s.bgImg}
      imageStyle={s.img}
    >
      {isFontLoaded && (
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>{renderOnScreen()}</SafeAreaView>
        </SafeAreaProvider>
      )}
    </ImageBackground>
  );
}
