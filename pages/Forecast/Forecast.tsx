import {
  AppState,
  AppStateStatus,
  BackHandler,
  StyleSheet,
  View,
} from "react-native";
import StyledText from "../../components/StyledText/StyledText";
import HeaderForecast from "../../components/HeaderForecast/HeaderForecast";
import BodyForecast from "../../components/BodyForecast/BodyForecast";
import { WeatherDetailsType } from "../../utils/types/weatherDetailsType";
import { LocationDetailsType } from "../../utils/types/locationDetails";
import { LocationGeocodedAddress } from "expo-location";
import { SCREEN } from "../../App";
import { useEffect, useState } from "react";

export default function Forecast({
  weatherDetails,
  locationDetails,
  onPressBack,
}: {
  weatherDetails: WeatherDetailsType | undefined;
  locationDetails: LocationGeocodedAddress | undefined;
  onPressBack: (screen: SCREEN) => void;
}) {
  const city = locationDetails?.city;
  const country = locationDetails?.country;
  const address = `${city ? city + ", " : ""} ${country ?? ""}`;
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );

  useEffect(() => {
    const backAction = () => {
      onPressBack(SCREEN.HOME);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };

    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      backHandler.remove();
      appStateListener.remove();
    };
  }, [appState]);
  return (
    <View style={styles.container}>
      <HeaderForecast address={address} onPressBack={onPressBack} />
      <BodyForecast weatherDetails={weatherDetails} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
