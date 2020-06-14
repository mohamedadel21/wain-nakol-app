import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Intro from "../screens/Intro";
import RestuarantDetails from "../screens/RestuarantDetails";
import ImageZoom from "../screens/ImageZoom";

const AppNavigator = createStackNavigator(
  {
    Intro: {
      screen: Intro,
      navigationOptions: {
        headerShown: false,
      },
    },

    ImageZoom: {
      screen: ImageZoom,
      navigationOptions: {
        headerShown: false,
      },
    },

    restuarant: {
      screen: RestuarantDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "Intro",
  }
);

export default createAppContainer(AppNavigator);
