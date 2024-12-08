import { TextInput, View } from "react-native";
import { s } from "./Home.style";
import StyledText from "../../components/StyledText/StyledText";
import MeteoBasic, {
  MeteoBasicProps,
} from "../../components/MeteoBasic/MeteoBasic";
import { LocationDetailsType } from "../../utils/types/locationDetails";
import { WeatherDetailsType } from "../../utils/types/weatherDetailsType";
import { useEffect, useState } from "react";
import { getInterpretationByCode } from "../../utils/meteo-utils";
import { isValidNumber } from "../../utils/validate";
import MeteoAdvanced, {
  MeteoAdvancedProps,
} from "../../components/MeteoAdvanced/MeteoAdvanced";
import { LocationGeocodedAddress } from "expo-location";
import { SCREEN } from "../../App";
import { fetchLocationDetailByCoords } from "../../api/meteo";
import { CoordinatesType } from "../../utils/types/coordinate";

export function Home({
  weatherDetails,
  locationDetails,
  coords,
  onPressRefreshAddress,
  onPressTemperature,
  onSubmitCity,
}: {
  weatherDetails: WeatherDetailsType | undefined;
  locationDetails: LocationGeocodedAddress | undefined;
  onPressRefreshAddress: () => void;
  onPressTemperature: (screen: SCREEN) => void;
  onSubmitCity: (city: string) => void;
  coords: CoordinatesType;
}) {
  const [meteoBasicData, setMeteoBasicData] = useState<MeteoBasicProps>();
  const [meteoAdvancedData, setMeteoAdvancedData] =
    useState<MeteoAdvancedProps>();
  const [address, setAddress] = useState<string>("");
  useEffect(() => {
    const currentWeather = weatherDetails?.current_weather;
    const temperatureValue = currentWeather?.temperature;
    const weatherCode = currentWeather?.weathercode;
    const city = locationDetails?.city;
    const country = locationDetails?.country;
    if (
      !currentWeather ||
      !isValidNumber(temperatureValue) ||
      !isValidNumber(weatherCode)
    ) {
      return;
    }

    const interpretation = getInterpretationByCode(weatherCode as number);
    if (!interpretation) return;

    let newAddress = `${city ? city + ", " : ""} ${country ?? ""}`;

    async function getLocationDetailsByCoords() {
      if (!newAddress.trim()) {
        newAddress =
          (await fetchLocationDetailByCoords(coords)).address?.city ?? "";
      }
      setAddress(newAddress);
    }
    getLocationDetailsByCoords();
    const { image, label } = interpretation;
    setMeteoBasicData({
      address,
      image,
      label,
      temperatureValue: Math.round(temperatureValue as number),
      onPressRefreshAddress,
      onPressTemperature,
    });
  }, [weatherDetails, locationDetails, address]);

  useEffect(() => {
    const sunrise = weatherDetails?.daily?.sunrise;
    const sunset = weatherDetails?.daily?.sunset;
    const windspeed = weatherDetails?.current_weather?.windspeed ?? 0;

    if (!sunrise?.length || !sunset?.length || !isValidNumber(windspeed)) {
      return;
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    function getTimeString(time: string) {
      return new Date(time).toLocaleTimeString("en-US", timeOptions);
    }
    const sunriseTime = getTimeString(sunrise[0]);
    const sunsetTime = getTimeString(sunset[0]);

    setMeteoAdvancedData({
      sunrise: sunriseTime,
      sunset: sunsetTime,
      windspeed,
    });
  }, [weatherDetails]);
  return meteoBasicData ? (
    <>
      <View style={s.weatherBasic}>
        <MeteoBasic {...meteoBasicData} />
      </View>
      <View style={s.searchBar}>
        <TextInput
          style={s.searchBarInput}
          placeholder="Input a city you want !!!"
          onSubmitEditing={(e) => {
            onSubmitCity(e.nativeEvent.text);
          }}
        />
      </View>
      <View style={s.weatherAdvanced}>
        {meteoAdvancedData && <MeteoAdvanced {...meteoAdvancedData} />}
      </View>
    </>
  ) : (
    <StyledText>Loading...</StyledText>
  );
}
