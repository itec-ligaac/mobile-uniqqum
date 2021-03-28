import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { colors, sizes, fonts, screen } from "../theme";
import { Entypo, FontAwesome, Feather } from "@expo/vector-icons";
import firebase from "firebase";

export default class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: true,
      email: "",
    };
  }
  componentDidMount() {
    // Font.loadAsync(customFonts);
  }

  resetPassword = () => {
    if (this.state.email.length > 0) {
      firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => {
          Alert.alert(
            "Success",
            "An email was send to " + this.state.email.toString()
          );
        })
        .catch((error) => {
          Alert.alert("Ooops!", error.message);
        });
    }
  };

  render() {
    return (
      <View style={{ height: screen.height }}>
        <View style={styles.container}>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              flex: 3,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              RESET PASSWORD
            </Text>
          </View>
          <View style={{ marginTop: 20, flex: 4 }}>
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
            <Text style={styles.authText}>
              You will receive instructions to reset your password at the
              specified email address
            </Text>
          </View>

          <View style={[styles.bntView, { flex: 2 }]}>
            <TouchableOpacity
              style={[styles.btn, styles.shadow]}
              onPress={() => this.resetPassword()}
            >
              <Text style={styles.btnText}>SEND</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ paddingTop: 25 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.forgotPassText}>remembered the password</Text>
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
            <Text>or connect with</Text>
          </View>
          <View style={[styles.socialMediaView, { flex: 5 }]}>
            <TouchableOpacity
              style={[
                styles.socialMediaButton,
                { backgroundColor: "#2596be" },
                styles.shadow,
              ]}
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
              onPress={() => this.signInWithGoogleAsync()}
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
    textAlign: "center",
    color: colors.gray,
    fontSize: 14,
    marginTop: 10,
    width: screen.width * 0.8,
  },
  bntView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
    fontWeight: "500",
    fontSize: 16,
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
    // textAlign: "right",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
