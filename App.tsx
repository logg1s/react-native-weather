import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Home } from "./pages/Home/Home";
import { ImageBackground } from "react-native";

export default function App() {
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
