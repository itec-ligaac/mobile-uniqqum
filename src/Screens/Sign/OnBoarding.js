import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Animated,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, sizes, fonts, screen } from "../theme";

const slides = [
  {
    key: "1",
    title: "WELCOME",
    text:
      "Welcome to 'Find a Mate'. \nPlease Sign In if you  have an accout or Sign Up to create one and then let's start the trip together",
    image: require("../assets/1.png"),
  },
  {
    key: "2",
    title: "FIND A TEAMMATE",
    text:
      "malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie at elementum eu facilisis sed odio morbi",
    image: require("../assets/prim.png"),
  },
  {
    key: "3",
    title: "KNOW PEOPLE",
    text:
      "gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut",
    image: require("../assets/th.png"),
  },
  {
    key: "4",
    title: "CHILL TIME",
    text:
      "aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient",
    image: require("../assets/1.png"),
  },
  {
    key: "5",
    title: "DISTRACTIONS",
    text:
      "gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris",
    image: require("../assets/1.png"),
  },
];

export default class OnBoarding extends React.Component {
  state = { showHomePage: false };
  _renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={item.image}
          style={{
            marginTop: screen.height * 0.03,
            resizeMode: "contain",
            height: "50%",
            width: "100%",
          }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              paddingTop:
                Platform.OS === "ios"
                  ? screen.height * 0.05
                  : screen.height * 0.025,
              paddingBottom:
                Platform.OS === "ios"
                  ? screen.height * 0.03
                  : screen.height * 0.025,
              fontSize: 23,
              fontWeight: "bold",
              color: "#21465b",
              alignSelf: "center",
            }}
          >
            {item.title}
          </Text>

          <Text
            style={{
              textAlign: "center",
              color: "#b5b5b5",
              fontSize: 16,
              paddingHorizontal: 30,
            }}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    if (this.state.showHomePage) {
      return <OnBoarding />;
    } else
      return (
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 8 }}>
              <AppIntroSlider
                renderItem={this._renderItem}
                data={slides}
                activeDotStyle={{
                  backgroundColor: colors.main,
                }}
                // renderDoneButton={this._renderDoneButton}
                showNextButton={false}
                showDoneButton={false}
              />
            </View>
            <View style={styles.bntView}>
              <TouchableOpacity
                style={[styles.btn, styles.shadow]}
                onPress={() => {
                  // this.props.navigation.reset();
                  this.props.navigation.navigate("SignUp");
                }}
              >
                <Text style={styles.btnText}>Create an account</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.loginView, { flex: 1 }]}>
              <Text style={{ marginHorizontal: 20 }}>Have an account?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignIn")}
              >
                <Text style={styles.loginText}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  bntView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.8,
    height: Platform.OS === "ios" ? screen.height * 0.06 : screen.height * 0.06,
    backgroundColor: colors.main,
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
  loginView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  loginText: {
    color: colors.main,
    fontWeight: "bold",
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
