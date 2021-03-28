import React, { useState, Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors, sizes, fonts, screen, shadow } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import MultiSelect from "react-native-multiple-select";
import * as Location from "expo-location";

function FirstNameSetup({ navigation, route }) {
  const [name, setName] = useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            margin: 10,
            fontWeight: "500",
            fontSize: 24,
            marginTop: 40,
          }}
        >
          What's your first name?
        </Text>
        <TextInput
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 40,
            // width: screen.width,
            height: 80,
          }}
          // placeholder="0"
          keyboardType="default"
          onChangeText={(text) => setName(text)}
          placeholderTextColor={colors.gray2}
          autoFocus
          selectionColor="black"
        />
      </View>
      <View
        style={{
          marginBottom: screen.height * 0.4,
          alignSelf: "flex-end",
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            firebase
              .firestore()
              .collection("Users")
              .doc(firebase.auth().currentUser.uid)
              .set(
                {
                  firstName: name,
                },
                { merge: true }
              )
              .then(() => navigation.navigate("LastNameSetup"));
          }}
          disabled={name.length === 0}
        >
          <Ionicons
            name="arrow-redo-circle"
            size={50}
            color={name.length === 0 ? colors.gray2 : colors.greeny}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function LastNameSetup({ navigation, route }) {
  const [name, setName] = useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            margin: 10,
            fontWeight: "500",
            fontSize: 24,
            marginTop: 40,
          }}
        >
          What's your last name?
        </Text>
        <TextInput
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 40,
            // width: screen.width,
            height: 80,
          }}
          keyboardType="default"
          onChangeText={(text) => setName(text)}
          placeholderTextColor={colors.gray2}
          autoFocus
          selectionColor="black"
        />
      </View>
      <View
        style={{
          marginBottom: screen.height * 0.4,
          alignSelf: "flex-end",
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            firebase
              .firestore()
              .collection("Users")
              .doc(firebase.auth().currentUser.uid)
              .set(
                {
                  lastName: name,
                },
                { merge: true }
              )
              .then(() => navigation.navigate("GenderSetup"));
          }}
          disabled={name.length === 0}
        >
          <Ionicons
            name="arrow-redo-circle"
            size={50}
            color={name.length === 0 ? colors.gray2 : colors.greeny}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HobbiesSetup({ navigation }) {
  const [hobbies, setHobbies] = useState(items);
  const [location, setLocation] = React.useState(null);

  const changeSelected = (item) => {
    item.selected = !item.selected;
    var arr = JSON.parse(JSON.stringify(hobbies));
    var auxArr = [];
    arr.map((itm) =>
      itm.id !== item.id ? auxArr.push(itm) : auxArr.push(item)
    );
    setHobbies(auxArr);
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          changeSelected(item);
        }}
      >
        <View
          style={[
            styles.mainView,
            shadow.shadowModal,
            {
              backgroundColor: item.selected ? colors.main : "white",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 20,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: item.selected ? "white" : "black",
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: item.selected ? "white" : colors.gray }}>
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const start = () => {
    var arr = hobbies.filter((itm) => itm.selected);
    var aux = [];
    arr.forEach((itm) => aux.push(itm.name));
    var currentUser = firebase.auth().currentUser;

    async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location.coords);
    };
    var point = new firebase.firestore.GeoPoint(
      47.64100511726261,
      26.23650098881743
    );
    firebase.firestore().collection("Users").doc(currentUser.uid).set(
      {
        hobbies: aux,
        isProfileSet: true,
        coordinate: point,
      },
      {
        merge: true,
      }
    );

    navigation.navigate("StackNavigator");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          margin: 10,
          fontWeight: "500",
          fontSize: 24,
          marginTop: 40,
        }}
      >
        What are your hobbies?
      </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={hobbies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ marginHorizontal: 8 }} />}
        contentContainerStyle={{ alignItems: "center", width: screen.width }}
        ListFooterComponent={() => (
          <View style={{ marginBottom: 50 }}>
            <View style={styles.bntView}>
              <TouchableOpacity
                style={[styles.btn, styles.shadow]}
                onPress={() => {
                  start();
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "white" }}
                >
                  GET'S STARTED
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

function GenderSetup({ navigation, route }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          margin: 10,
          fontWeight: "500",
          fontSize: 24,
          marginTop: 40,
        }}
      >
        What's your gender?
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            firebase
              .firestore()
              .collection("Users")
              .doc(firebase.auth().currentUser.uid)
              .set(
                {
                  gender: "Female",
                },
                { merge: true }
              )
              .then(() => navigation.navigate("GoalSetup"));
          }}
          style={{ marginHorizontal: 20 }}
        >
          <View
            style={[
              styles.mainView,
              shadow.shadowModal,
              { width: screen.width * 0.3 },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                margin: 20,
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Ionicons name="female" size={40} color="black" />

                  <Text style={{ color: colors.gray }}>Female</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={() => {
            firebase
              .firestore()
              .collection("Users")
              .doc(firebase.auth().currentUser.uid)
              .set(
                {
                  gender: "Male",
                },
                { merge: true }
              )
              .then(() => navigation.navigate("AgeSetup"));
          }}
        >
          <View
            style={[
              styles.mainView,
              shadow.shadowModal,
              { width: screen.width * 0.3 },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                margin: 20,
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Ionicons name="male" size={40} color="black" />

                  <Text style={{ color: colors.gray }}>Male</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AgeSetup({ navigation, route }) {
  const [age, setAge] = useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            margin: 10,
            fontWeight: "500",
            fontSize: 24,
            marginTop: 40,
          }}
        >
          How old are you?
        </Text>
        <TextInput
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 60,
            width: screen.width,
            height: 80,
          }}
          placeholder="0"
          keyboardType="number-pad"
          onChangeText={(text) => setAge(text)}
          placeholderTextColor={colors.gray2}
          autoFocus
          selectionColor="black"
        />
      </View>
      <View
        style={{
          marginBottom: screen.height * 0.4,
          alignSelf: "flex-end",
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          disabled={age.length === 0}
          onPress={() => {
            firebase
              .firestore()
              .collection("Users")
              .doc(firebase.auth().currentUser.uid)
              .set(
                {
                  age: parseInt(age),
                },
                { merge: true }
              )
              .then(() => navigation.navigate("HobbiesSetup"));
          }}
        >
          <Ionicons
            name="arrow-redo-circle"
            size={50}
            color={age.length === 0 ? colors.gray2 : colors.greeny}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={"FirstNameSetup"}>
      <Stack.Screen
        name="FirstNameSetup"
        component={FirstNameSetup}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          headerTitle: "Step 1 of 5",
          gestureEnabled: true,
          headerLeft: () => null,
        })}
      />
      <Stack.Screen
        name="LastNameSetup"
        component={LastNameSetup}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          headerTitle: "Step 2 of 5",
          gestureEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                style={{ marginLeft: 10 }}
                name="ios-return-up-back"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="GenderSetup"
        component={GenderSetup}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          headerTitle: "Step 3 of 5",
          gestureEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                style={{ marginLeft: 10 }}
                name="ios-return-up-back"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AgeSetup"
        component={AgeSetup}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          headerTitle: "Step 4 of 5",
          gestureEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                style={{ marginLeft: 10 }}
                name="ios-return-up-back"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="HobbiesSetup"
        component={HobbiesSetup}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          headerTitle: "Step 5 of 5",
          gestureEnabled: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                style={{ marginLeft: 10 }}
                name="ios-return-up-back"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function ProfileSetup() {
  return <MyStack />;
}
const styles = StyleSheet.create({
  mainView: {
    width: screen.width * 0.9,
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.8,
    height: Platform.OS === "ios" ? screen.height * 0.06 : screen.height * 0.06,
    backgroundColor: colors.main,
    borderRadius: 20,
  },
});
const items = [
  { id: 1, name: "FOOTBALL", selected: false },
  { id: 2, name: "BASKETBALL", selected: false },
  { id: 3, name: "ROCK MUSIC", selected: false },
  { id: 4, name: "TENNIS", selected: false },
  { id: 5, name: "CLUB MUSIC", selected: false },
  { id: 6, name: "DANCING", selected: false },
  { id: 7, name: "CHILL MUSIC", selected: false },
  { id: 8, name: "GOLF", selected: false },
  { id: 9, name: "RUNNING", selected: false },
  { id: 10, name: "FITNESS", selected: false },
  { id: 11, name: "MUSEUM LOVER", selected: false },
  { id: 12, name: "MOVIES LOVER", selected: false },
  { id: 13, name: "COOKING", selected: false },
  { id: 14, name: "CARS LOVER", selected: false },
];
