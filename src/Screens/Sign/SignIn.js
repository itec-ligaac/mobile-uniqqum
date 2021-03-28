import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { colors, sizes, fonts, screen } from "../theme";
import * as Font from "expo-font";
import { SafeAreaView, Alert } from "react-native";
import { Entypo, FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import firebase from "firebase";

export default class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      email: "",
      password: "",
    };
  }
  componentDidMount() {}

  ///SIGN IN EMAIL AND PASSWORD
  signInUser = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => console.log("User is signed in!"))
        .catch((error) => {
          Alert.alert("Ooops!", error);
        });
    } catch (error) {}
  };

  render() {
    return (
      <View style={{ height: screen.height }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                style={{
                  textAlign: "left",
                }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Entypo
                  name="chevron-with-circle-left"
                  size={40}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SIGN IN
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <AntDesign name="login" size={40} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              flex: 3,
            }}
          >
            <Text style={styles.welcomeText}>Welcome to Find A Mate!</Text>

            <Text style={styles.authText}>
              Sign In by filling in the information below:
            </Text>
          </View>
          <View style={{ marginTop: 20, flex: 5 }}>
            <Text style={styles.topInputText}>Email adress</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="you@your-domain.com"
                placeholderTextColor="#000000"
                value={this.state.email}
                onChangeText={(val) => {
                  this.setState({ email: val });
                }}
              ></TextInput>
            </View>

            <Text style={styles.topInputText}>Password</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
                placeholder="Shhh! This is super secret!"
                placeholderTextColor="#000000"
                secureTextEntry={this.state.isSecure}
                value={this.state.passowrd}
                onChangeText={(val) => {
                  this.setState({ password: val });
                }}
              ></TextInput>
              <TouchableOpacity
                style={{ justifyContent: "center", backgroundColor: "red" }}
                onPress={() =>
                  this.setState({ isSecure: !this.state.isSecure })
                }
              >
                <Feather
                  name={this.state.isSecure ? "eye-off" : "eye"}
                  size={screen.height * 0.0325}
                  color="black"
                  style={{ position: "absolute", right: 10 }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ paddingTop: 15 }}
              onPress={() => this.props.navigation.navigate("ResetPassword")}
            >
              <Text style={styles.forgotPassText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.btnView, { flex: 1 }]}>
            <TouchableOpacity
              style={[styles.btn, styles.shadow]}
              onPress={() => {
                this.signInUser();
              }}
            >
              <Text style={styles.btnText}>Sing In</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              marginTop: 30,
              flex: 1,
            }}
          >
            <Text>OR SIGN IN WITH</Text>
          </View>
          <View style={[styles.socialMediaView, { flex: 3 }]}>
            <TouchableOpacity
              style={[
                styles.socialMediaButton,
                { backgroundColor: "#2596be" },
                styles.shadow,
              ]}
              onPress={() => console.log("faceboko")}
            >
              <FontAwesome
                name="facebook"
                size={screen.width * 0.1}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialMediaButton,
                { backgroundColor: "#DD2C00" },
                styles.shadow,
              ]}
              onPress={() => console.log("google")}
            >
              <FontAwesome
                name="google"
                size={screen.width * 0.1}
                color="white"
                style
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: screen.height,
  },
  welcomeText: {
    // fontFamily: "Inter-Light",
    fontSize: screen.width * 0.055,
    textAlign: "center",
  },
  authText: {
    // fontFamily: "Roboto-Light",
    color: colors.gray,
    fontSize: 14,
    marginTop: 10,
  },
  btnView: {
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
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
  socialMediaView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialMediaButton: {
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.2,
    height: screen.width * 0.2,
    borderRadius: screen.width * 0.2,
    marginHorizontal: 20,
  },
  textInput: {
    paddingLeft: 20,
    width: screen.width * 0.8,
    height: screen.height * 0.065,
    borderRadius: 10,
    backgroundColor: "#CFD8DC",
    opacity: 0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    height: screen.height * 0.065,
  },
  topInputText: {
    // fontFamily: "Roboto-Light",
    marginLeft: 10,
    marginBottom: 5,
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
  forgotPassText: {
    color: colors.main,
    fontWeight: "bold",
    textAlign: "right",
  },
  header: {
    flex: 2,
    width: screen.width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});
