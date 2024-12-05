import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Home } from "./pages/Home/Home";
import { ImageBackground } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { CoordinatesType } from "./utils/types/coordinate";
import { fetchWeatherByCoords } from "./api/meteo";

export default function App() {
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    lat: 21.6127483,
    lng: 105.83958,
  });
  const [weather, setWeather] = useState();
  const isFirstRender = useRef<boolean>(true);

  async function getCurrentLocation() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      alert("Please restart app and grant location permission !");
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (isFirstRender?.current) {
      isFirstRender.current = false;
      return;
    }
    async function getWeatherByCoords() {
      const weatherResponse = await fetchWeatherByCoords(coordinates);
      if (weatherResponse) {
        setWeather(weatherResponse);
      }
    }
    getWeatherByCoords();
  }, [coordinates]);
  return (
    <ImageBackground
      source={require("./assets/background.png")}
      style={s.bgImg}
      imageStyle={s.img}
    >
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          <Home />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
