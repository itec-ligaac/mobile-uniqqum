import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import MapView, { Marker, ProviderPropType } from "react-native-maps";
import flagPinkImg from "./assets/flag-pink.png";
import { Avatar } from "react-native-elements";
import * as Location from "expo-location";
import { FlatList } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { colors, sizes, fonts, screen, shadow } from "./theme";

const ASPECT_RATIO = width / height;
const LATITUDE = 47.675617447894965;
const LONGITUDE = 26.2333;
const LATITUDE_DELTA = 0.1922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function PeopleMap() {
  const [thisUser, setThisUser] = useState(null);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [markers, setMarkers] = useState([
    {
      title: "hello",
      coordinate: {
        latitude: 47.68671086950833,
        longitude: 26.241026499451458,
      },
    },
    {
      title: "hello",
      coordinate: {
        latitude: 47.66671086950833,
        longitude: 26.251026499451458,
      },
    },
  ]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [tempMarkers, setTempMarkers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const onMapPress = (e) => {
    setMarkers([
      ...markers,
      {
        coordinate: e.nativeEvent.coordinate,
        key: randomKey(),
      },
    ]);
    // console.log(markers);
  };
  function randomKey() {
    return Math.random().toString(36).substring(7);
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        var arr = [];
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.id !== firebase.auth().currentUser.uid)
            arr.push(documentSnapshot.data());
          else setThisUser(documentSnapshot.data());
        });
        setMarkers(arr);
        setTempMarkers(arr);
        setLoading(false);
      });

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let loc = region;
      loc.latitude = location.coords.latitude;
      loc.longitude = location.coords.longitude;
      setLocation(loc);
    })();

    // console.log(markers);
  }, []);

  const ClearAll = () => {
    return (
      <Animatable.View
        animation={
          Object.entries(selectedCategory).length === 0
            ? "fadeOutLeft"
            : "fadeInLeft"
        }
        duration={100}
      >
        {Object.entries(selectedCategory).length !== 0 ? (
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => {
              setTempMarkers(markers);
              setSelectedCategory({});
            }}
          >
            <View
              style={[
                {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "white",
                  borderRadius: 30,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                },
                styles.shadowBtn,
              ]}
            >
              <FontAwesome
                name="refresh"
                size={16}
                color="black"
                style={{ marginRight: 10 }}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Reset
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </Animatable.View>
    );
  };

  const filterData = (item) => {
    var arr = markers;
    // console.log(selectedCategory)
    var aux = arr.filter((itm) => itm.hobbies.includes(item));
    // console.log(aux);
    setTempMarkers(aux);
  };
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // this.setState({
        //   selectedCategory:
        //     this.state.selectedCategory.categoryID !== item.categoryID
        //       ? item
        //       : {},
        // });
        setSelectedCategory(item);
        filterData(item);
      }}
    >
      <View
        style={[
          {
            paddingHorizontal: 30,
            paddingVertical: 10,
            backgroundColor:
              item === selectedCategory ? colors.accent : "#e6e6e6",

            borderRadius: 30,
          },
          styles.shadowBtn,
        ]}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "black",
          }}
        >
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (!loading) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          // onPress={onMapPress}
        >
          {tempMarkers.map((marker) => (
            <Marker
              title={marker.name}
              description={marker.description}
              key={marker.key}
              coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
              }}
            >
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: marker.image,
                }}
              />
            </Marker>
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity
            onPress={() => setMarkers([])}
            style={styles.bubble}
          >
            <Text>Tap to create a marker of random color</Text>
          </TouchableOpacity> */}

          <FlatList
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={thisUser.hobbies}
            renderItem={renderCategory}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={{ marginHorizontal: 8 }} />
            )}
            contentContainerStyle={{ alignItems: "center" }}
            ListHeaderComponent={() => <ClearAll />}
          />
        </View>
      </View>
    );
  } else {
    return <ActivityIndicator size="large" />;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    // width: width,
    // height: height * 0.15,
    padding: 20,
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    borderTopColor: "black",
    borderTopWidth: 1,
    elevation: 17,
  },
});

export default PeopleMap;
