import { View } from "react-native";
import StyledText from "../StyledText/StyledText";
import { s } from "./MeteoAdvanced.style";

export type MeteoAdvancedProps = Readonly<{
  sunrise: string;
  sunset: string;
  windspeed: number;
}>;

export default function MeteoAdvanced({
  sunrise,
  sunset,
  windspeed,
}: MeteoAdvancedProps) {
  return (
    <View style={s.container}>
      <View style={s.view}>
        <StyledText style={s.value}>{sunrise}</StyledText>
        <StyledText style={s.label}>Sunrise</StyledText>
      </View>
      <View style={s.view}>
        <StyledText style={s.value}>{sunset}</StyledText>
        <StyledText style={s.label}>Sunset</StyledText>
      </View>
      <View style={s.view}>
        <StyledText style={s.value}>{windspeed}</StyledText>
        <StyledText style={s.label}>Windspeed</StyledText>
      </View>
    </View>
  );
}
