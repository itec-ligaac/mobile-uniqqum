import React from "react";
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { FAB } from "react-native-paper";

import MapView, { Polyline, ProviderPropType, Marker } from "react-native-maps";
import axios from "axios";
const { width, height } = Dimensions.get("window");
import { colors, sizes, fonts, screen, shadow } from "./theme";
import Modal from "react-native-modal";
import AppleStyleSwipeableRow from "./AppleStyleSwipeableRow";
import { Button } from "react-native-elements";

const ASPECT_RATIO = width / height;
const LATITUDE = 51.52120113582882;
const LONGITUDE = -0.12910924886694738;
const LATITUDE_DELTA = 0.5922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const API_KEY = "ayLaoRYFpOOF2L6R59czkK_QZSR5pvzCiKa0nNe7Ee4";

class DailyMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isLoading: true,
      startingLocation: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      finishLocation: {
        latitude: LATITUDE + 0.1,
        longitude: LONGITUDE + 0.2,
      },

      polyData: [
        {
          latitude: LATITUDE + 0.1,
          longitude: LONGITUDE,
          name: "Home",
          description: "Sweet Home",
        },
        {
          latitude: LATITUDE + 0.1,
          longitude: LONGITUDE + 0.2,
          name: "Bank",
          description: "Go bank",
        },
        {
          latitude: LATITUDE + 0.1,
          longitude: LONGITUDE + 0.2,
          name: "Market",
          description: "Food",
        },
        {
          latitude: LATITUDE - 0.15,
          longitude: LONGITUDE + 0.01,
          name: "Shopping",
          description: "New shoes",
        },
        {
          latitude: LATITUDE + 0.18,
          longitude: LONGITUDE - 0.25,
          name: "Disco",
          description: "Chill time",
        },
      ],

      routeForMap: [],
      isModalVisible: false,
    };
  }

  _getRoute = () => {
    var arr = this.state.polyData;
    for (let i = 0; i < arr.length - 1; i++) {
      let from_lat = parseFloat(arr[i].latitude);
      let from_long = parseFloat(arr[i].longitude);
      let to_lat = parseFloat(arr[i + 1].latitude);
      let to_long = parseFloat(arr[i + 1].longitude);
      let route_coordinates = [];
      axios
        .get(
          `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${API_KEY}&waypoint0=geo!${from_lat},${from_long}&waypoint1=geo!${to_lat},${to_long}&mode=fastest;car;traffic:disabled&legAttributes=shape`
        )
        .then((res) => {
          res.data.response.route[0].leg[0].shape.map((m) => {
            let latlong = m.split(",");
            let latitude = parseFloat(latlong[0]);
            let longitude = parseFloat(latlong[1]);
            route_coordinates.push({
              latitude: latitude,
              longitude: longitude,
            });
          });
          this.setState({
            routeForMap: [...this.state.routeForMap, ...route_coordinates],
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this._getRoute();
  }
  render() {
    console.log(this.state.routeForMap.length);
    if (!this.state.isLoading) {
      return (
        <MapView
          provider={this.props.provider}
          style={styles.container}
          initialRegion={this.state.region}
          showsUserLocation={true}
        >
          <Button
            title="Add new routes"
            type="solid"
            onPress={() =>
              this.props.navigation.navigate("AddDailyMap", {
                location: this.state.polyData[0],
                polyData: this.state.polyData,
              })
            }
          />
          <Polyline
            coordinates={this.state.routeForMap}
            strokeWidth={4}
            strokeColor={colors.accent}
            // geodesic={true}
          />
          {this.state.polyData.map((marker) => (
            <Marker
              title={marker.name}
              description={marker.description}
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            ></Marker>
          ))}
        </MapView>
      );
    } else return <ActivityIndicator size="large" />;
  }
}

DailyMap.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    height: screen.height * 0.4,
    width: screen.width,
    // alignSelf: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 15,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default DailyMap;
