import { Modal } from "react-native";
import ImageView from "react-native-image-view";
import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../Constant/Colors";
import { AntDesign } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     
    };

  }

  render() {
    const images = []
    this.props.navigation.getParam("images").map(item=>{
        images.push( {
            source: {
                uri: item,
            },
            title: 'Paris',
            width: 806,
            height: 720,
        })
    })
    return (
      <View style={{ flex: 1 }}>
        <ImageView
          images={images}
          imageIndex={0}
          onClose={()=>{
              this.props.navigation.goBack()
          }}
          renderFooter={(currentImage) => (
            <View>
              <Text>My footer</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
