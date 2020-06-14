import React, { Component } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  View,
  Linking,
  Share,
  RefreshControl,
} from "react-native";
import Colors from "../Constant/Colors";
const { height, width } = Dimensions.get("window");
import {
  MaterialIcons,
  Ionicons,
  EvilIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { getRestauatntDetails } from "../actions";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.035 * ASPECT_RATIO;
const LON_DELTA = 0.035 * ASPECT_RATIO;

class Restuarant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      longitude: 2.325430,
      latitude: 4.24320,
      address: "",
      refreshing: false,
    };

    Permissions.askAsync(Permissions.LOCATION).then((status, permissions) => {
      if (status === "granted") {
        return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      } else {
        console.log("Location permission not granted");
      }
    });
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getCurrentLocation();
    this.setState({ refreshing: false, text: null });
  };

  async UNSAFE_componentWillMount() {
    this.getCurrentLocation();
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.restuarantDetails) {
      console.log(props.restuarantDetails);
      this.setState({ restaurant: props.restuarantDetails });
    }
  }

  getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});

    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    console.log(currentLocation);
    

    await this.props.getRestauatntDetails(currentLocation);
    this.map.animateToRegion(
      {
        latitude: this.state.restaurant.lat,
        longitude: this.state.restaurant.lon,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LON_DELTA,
      },
      350
    );
  };

  getMapRegion = () => ({
    latitude: this.state.restaurant.lat,
    longitude: this.state.restaurant.lon,
    latitudeDelta: LAT_DELTA,
    longitudeDelta: LON_DELTA,
  });

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <View style={styles.Header}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo-white.png")}
          ></Image>
        </View>

        {this.state.restaurant && !this.state.loading && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.detailsView}>
              <Text style={styles.nameText}>{this.state.restaurant.name}</Text>

              <View style={styles.detailsView}>
                <Text style={styles.rateText}>
                  {this.state.restaurant.rating}/10
                </Text>
                <AntDesign name="staro" color={Colors.orange} size={17} />
                <Text style={styles.catNameText}>
                  {this.state.restaurant.cat}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      "http://maps.apple.com/maps?daddr=" +
                        this.state.restaurant.lat +
                        "," +
                        this.state.restaurant.lon
                    );
                  }}
                  style={{ marginLeft: 15 }}
                >
                   <Image
            style={{height:20,width:20}}
            source={require("../../assets/maps.png")}
          ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("ImageZoom", {
                      images: this.state.restaurant.image,
                    });
                  }}
                  style={{ marginLeft: 15 }}
                >
                  <MaterialIcons
                    name="image"
                    color={Colors.grayColor}
                    size={24}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const result = await Share.share({
                        message:
                          "Hello! I’m eating at " +
                          this.state.restaurant.name +
                          "  googlemaps.com/?q=" +
                          this.state.restaurant.lat +
                          "," +
                          this.state.restaurant.lon +
                          "   - Suggested by Wain NakelWainNakel.com",
                      });

                      if (result.action === Share.sharedAction) {
                        if (result.activityType) {
                          // shared with activity type of result.activityType
                        } else {
                          // shared
                        }
                      } else if (result.action === Share.dismissedAction) {
                        // dismissed
                      }
                    } catch (error) {
                      alert(error.message);
                    }
                  }}
                  style={{ marginLeft: 15 }}
                >
                  <MaterialIcons
                    name="share"
                    color={Colors.grayColor}
                    size={24}
                  />
                </TouchableOpacity>

                {this.state.restaurant.open == "1" && (
                  <Image
                    style={styles.isOpen}
                    source={require("../../assets/open.png")}
                  ></Image>
                )}
                {this.state.restaurant.open == "" && (
                  <Image
                    style={styles.isOpen}
                    source={require("../../assets/closed.png")}
                  ></Image>
                )}
              </View>
            </View>

            <MapView
              ref={(map) => (this.map = map)}
              style={{ flexGrow: 1, width: width, alignSelf: "center" }}
              initialRegion={{
                latitude: this.state.restaurant.lat,
                longitude: this.state.restaurant.lon,
                latitudeDelta: LAT_DELTA,
                longitudeDelta: LON_DELTA,
              }}
              region={this.getMapRegion()}
            >
              <MapView.Marker
                title={this.state.restaurant.name}
                coordinate={{
                  latitude: this.state.restaurant.lat,
                  longitude: this.state.restaurant.lon,
                }}
              >
                <AntDesign
                  name="enviroment"
                  color={Colors.primaryColor}
                  size={35}
                />
              </MapView.Marker>
            </MapView>

            <TouchableOpacity
              onPress={() => {
                this.getCurrentLocation();
              }}
              style={styles.buttonsView}
            >
              <View style={styles.buttonOne}>
                <Ionicons name="ios-options" color={Colors.white} size={20} />
              </View>

              <View style={styles.buttonTwo}>
                <Text style={styles.suggestText}>اقتراح اخر</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}

        {!this.state.restaurant && !this.state.loading && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            contentContainerStyle={[
              styles.scrollView,
              { justifyContent: "center" },
            ]}
          >
            <Text style={[styles.nameText, { fontSize: 15 }]}>
              لا يوجد مطاعم في {"\n"}هذه المنطقة
            </Text>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsView: { flexDirection: "row", marginTop: 10 },
  logo: {
    width: 55,
    height: 42,
    position: "absolute",
    bottom: 10,
  },
  Header: {
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    height: 80,
  },

  detailsView: {
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  buttonsView: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
  },
  buttonOne: {
    backgroundColor: Colors.primaryColor,
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTwo: {
    marginLeft: 10,
    backgroundColor: Colors.primaryColor,
    height: 45,
    width: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestText: {
    fontFamily: "sans-plain",
    fontSize: 18,
    color: Colors.white,
  },
  rateText: {
    fontFamily: "sans-plain",
    fontSize: 15,
    color: Colors.black,
    marginRight: 5,
  },
  nameText: {
    fontFamily: "sans-bold",
    fontSize: 20,
    color: Colors.primaryColor,
    textAlign: "center",
  },
  catNameText: {
    fontFamily: "sans-plain",
    fontSize: 15,
    color: Colors.black,
    marginLeft: 5,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  isOpen: {
    width: 30,
    height: 17,
    marginLeft: 10,marginTop:2.5,
    shadowOffset: { width: 0, height: 2 },
  },
});

const mapStateToProps = ({ rest }) => {
  return {
    loading: rest.loading,
    restuarantDetails: rest.restuarant,
    error: rest.error,
  };
};

export default connect(mapStateToProps, {
  getRestauatntDetails,
})(Restuarant);
