import { Image, ImageProps, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText/StyledText";
import { s } from "./MeteoBasic.style";
import ClockHHMM from "../ClockHHMM/ClockHHMM";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SCREEN } from "../../App";
import { fetchLocationDetailByCoords } from "../../api/meteo";

export type MeteoBasicProps = Readonly<{
  address: string;
  temperatureValue: number;
  label: string;
  image: ImageProps;
  onPressRefreshAddress: () => void;
  onPressTemperature: (screen: SCREEN) => void;
}>;

export default function MeteoBasic({
  address,
  image,
  label,
  temperatureValue,
  onPressRefreshAddress,
  onPressTemperature,
}: MeteoBasicProps) {
  return (
    <>
      <View style={s.clock}>
        <ClockHHMM />
      </View>
      <View style={s.box_address}>
        <StyledText style={s.address}>{address}</StyledText>
        <TouchableOpacity onPress={onPressRefreshAddress}>
          <Ionicons name="reload-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={s.box_temperature}>
        <TouchableOpacity
          style={s.box_touchTemp}
          onPress={() => onPressTemperature(SCREEN.FORECAST)}
        >
          <StyledText style={s.temperature}>{temperatureValue}°</StyledText>
          <View style={s.box_interpretation}>
            <StyledText>{label}</StyledText>
            <Image style={s.img_temperature} source={image} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
