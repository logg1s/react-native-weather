import { Text, View } from "react-native";
import { s } from "./Home.style";

export function Home() {
  return (
    <>
      <View style={s.weatherBasic}>
        <Text style={s.txt}>Header</Text>
      </View>
      <View style={s.searchBar}>
        <Text style={s.txt}>Body</Text>
      </View>
      <View style={s.weatherAdvanced}>
        <Text style={s.txt}>Footer</Text>
      </View>
    </>
  );
}
