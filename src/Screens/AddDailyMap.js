import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { colors, sizes, fonts, screen, shadow } from "./theme";
import axios from "axios";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";

import AppleStyleSwipeableRow from "./AppleStyleSwipeableRow";
const YOUR_APP_CODE = "ayLaoRYFpOOF2L6R59czkK_QZSR5pvzCiKa0nNe7Ee4";
const YOUR_APP_ID = "GAe56oXUOg44o3k1Rs1x";
class map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapAddData: this.props.route.params.polyData.slice(1),
      mapObjective: this.props.route.params.location,
    };
  }

  onChangemapValue = (val, index) => {
    var aux = this.state.mapAddData;
    aux[index].value = val;
    // console.log(this.state.mapAddDataAux);
  };
  deletemapSwipe(item) {
    if (this.state.mapAddData.length > 1) {
      this.setState({
        mapAddData: this.state.mapAddData.filter(
          (aux) => aux.name !== item.name
        ),
      });
    } else Alert.alert("Something wrong", "Sorry, item can't be deleted :(");
  }

  rendermapInput = ({ item, index }) => {
    let ind = index;
    return (
      <AppleStyleSwipeableRow
        deleteItem={() => {
          this.deletemapSwipe(item);
        }}
      >
        <TextInput
          right={
            <TextInput.Icon
              name={() => <Ionicons name={"pencil"} size={26} color="gray" />}
            />
          }
          style={styles.textInputmapSettings}
          underlineColor={colors.notes}
          theme={{
            colors: {
              placeholder: "white",
              primary: "#03A9F4",
              underlineColor: "transparent",
              background: "#fff",
            },
          }}
          defaultValue={item.name.toString()}
          onChangeText={(val) => this.onChangemapValue(val, ind)}
        />
      </AppleStyleSwipeableRow>
    );
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.centeredViewModal}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <FontAwesome
              name="map"
              size={24}
              color={colors.main}
              style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Make you plan step by step:
            </Text>
          </View>

          <TextInput
            right={
              <TextInput.Icon
                name={() => <Ionicons name={"pencil"} size={26} color="gray" />}
              />
            }
            style={styles.textInputmapSettings}
            underlineColor={colors.notes}
            theme={{
              colors: {
                placeholder: "white",
                primary: "#03A9F4",
                underlineColor: "transparent",
                background: "#fff",
              },
            }}
            keyboardType="numeric"
            defaultValue={this.state.mapObjective.name.toString()}
            onChangeText={(val) => {
              this.setState({ mapObjective: val });
            }}
          />

          <View style={{ width: screen.width * 0.9, marginTop: 50 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5
                name="route"
                size={24}
                color={colors.main}
                style={{ marginHorizontal: 5 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Add Next Routes:
              </Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={this.state.mapAddData}
              renderItem={this.rendermapInput}
            />
          </View>
          <View
            style={{
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F3E5F5",
                },
              ]}
              onPress={() => {
                this.setState({
                  mapAddData: [...this.state.mapAddData, ["New Route"]],
                });
              }}
            >
              <Ionicons name="add" size={26} color="black" />
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                ADD ROUTE
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 50,
            }}
          >
            <TouchableOpacity
              style={[
                styles.btn,
                styles.shadow,
                { marginTop: 30, backgroundColor: colors.main },
              ]}
              onPress={() => {
                console.log("save");
                this.props.navigation.navigate("DailyMap");
              }}
            >
              <Text style={styles.btnText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredViewModal: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  textInputmapSettings: {
    // marginTop: 10,
    backgroundColor: "#fff",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.5,
    height: screen.height * 0.05,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
});
export default map;
