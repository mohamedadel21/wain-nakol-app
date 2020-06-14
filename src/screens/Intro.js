import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import Colors from "../Constant/Colors";
import { LoadFonts } from "../Constant/Fonts";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";
const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.035 * ASPECT_RATIO;
const LON_DELTA = 0.035 * ASPECT_RATIO;

const splash = { splash: true };
class Splash extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    this.state = {
      defualt: 1,
      fontLoaded: false,
      uid: null,
    };

    LoadFonts();
  }

  async UNSAFE_componentWillMount() {
   
    await LoadFonts();
    this.setState({ fontLoaded: true });
    Permissions.askAsync(Permissions.LOCATION).then((status, permissions) => {
        if (status === "granted") {
          return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        } else {
          console.log("Location permission not granted");
        }
      });
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.fontLoaded ? (
                  <View style={{flex:1}}>

            <MapView
            ref={(map) => (this.map = map)}
            style={{ flex:  1, }}
            initialRegion={{
                latitude: 26.2716025,
                longitude: 50.2017993,
              latitudeDelta: LAT_DELTA,
              longitudeDelta: LON_DELTA,
            }}
           
          >
                        </MapView>

          <View style={styles.mainView}>
            <Image
              style={{
                width: 220,
                height: 170,
              }}
              source={require("../../assets/logo-white.png")}
            ></Image>

            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('restuarant')}
            style={styles.buttonsView}>
              <View style={styles.buttonOne}>
                <Ionicons
                  name="ios-options"
                  color={Colors.primaryColor}
                  size={25}
                />
              </View>

              <View style={styles.buttonTwo}>
                <Text
                  style={styles.suggestText}
                >
                  اقترح
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    width,height,
    backgroundColor: Colors.primaryColor2,
    justifyContent: "center",
    alignItems: "center",
    position:'absolute',
    
  },
  buttonsView: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonOne: {
    backgroundColor: Colors.white,
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTwo: {
    marginLeft: 10,
    backgroundColor: Colors.white,
    height: 45,
    width: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestText:{
    fontFamily: "sans-plain",
    fontSize: 18,
    color: Colors.primaryColor,
  }
});

const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, {})(Splash);
