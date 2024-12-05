import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Home } from "./pages/Home/Home";
import { ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { CoordinateType } from "./utils/types/coordinate";

export default function App() {
  const [coordinates, setCoordinates] = useState<CoordinateType>();

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
