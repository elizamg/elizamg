import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components/header";
import { useLocalSearchParams } from "expo-router";

import { Themes } from "../../assets/Themes";
import { Stack } from "expo-router";
import Row from "../../utils/timelineRow";
import BackgroundImage from "../../assets/Images/dayBackground.jpg";

const windowDimensions = Dimensions.get("window");
const testData = [
  {
    time: "NOW",
    weatherIcon: require("../../assets/Images/sunIcon.png"),
    temperature: "74°",
    clothingIcon1: require("../../assets/Images/shirtIcon.png"),
    clothingIcon2: require("../../assets/Images/shortsIcon.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail1-Sunny",
  },
  {
    time: "12:00pm",
    weatherIcon: require("../../assets/Images/sunIcon.png"),
    temperature: "76°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail1-Sunny",
  },
  {
    time: "1:00pm",
    weatherIcon: require("../../assets/Images/cloudsunIcon.png"),
    temperature: "70°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail1-Sunny",
  },
  {
    time: "2:00pm",
    weatherIcon: require("../../assets/Images/cloudIcon.png"),
    temperature: "65°",
    clothingIcon1: require("../../assets/Images/jacketIcon.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail2-Cloudy",
  },
  {
    time: "3:00pm",
    weatherIcon: require("../../assets/Images/cloudIcon.png"),
    temperature: "63°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail2-Cloudy",
  },
  {
    time: "4:00pm",
    weatherIcon: require("../../assets/Images/rainIcon.png"),
    temperature: "61°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/pantsIcon.png"),
    clothingIcon3: require("../../assets/Images/umbrellaIcon.png"),
    route: "screens/timelineDetail3-Rainy",
  },
  {
    time: "5:00pm",
    weatherIcon: require("../../assets/Images/rainIcon.png"),
    temperature: "58°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/downwardArrow.png"),
    route: "screens/timelineDetail3-Rainy",
  },
  {
    time: "6:00pm",
    weatherIcon: require("../../assets/Images/moonIconOrange.png"),
    temperature: "55°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail4-Night",
  },
  {
    time: "7:00pm",
    weatherIcon: require("../../assets/Images/moonIconOrange.png"),
    temperature: "54°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail4-Night",
  },
  {
    time: "8:00pm",
    weatherIcon: require("../../assets/Images/moonIconOrange.png"),
    temperature: "52°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail4-Night",
  },
  {
    time: "9:00pm",
    weatherIcon: require("../../assets/Images/moonIconOrange.png"),
    temperature: "48°",
    clothingIcon1: require("../../assets/Images/downwardArrow.png"),
    clothingIcon2: require("../../assets/Images/downwardArrow.png"),
    clothingIcon3: require("../../assets/Images/emptyImage.png"),
    route: "screens/timelineDetail4-Night",
  },
];

export default function timeline() {
  const navigation = useNavigation();
  const onTimelinePress = (route) => {
    navigation.navigate(route);
  };

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onTimelinePress(item.route)}>
        <Row
          time={item.time}
          weatherIcon={item.weatherIcon}
          temperature={item.temperature}
          clothingIcon1={item.clothingIcon1}
          clothingIcon2={item.clothingIcon2}
          clothingIcon3={item.clothingIcon3}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        style={styles.backgroundImage}
      ></ImageBackground>
      <StatusBar style="light" />
      <Image
        source={require("../../assets/Images/dayBackground.jpg")}
        style={styles.backgroundImage}
      />

      <Stack.Screen
        options={{
          title: "Clothing Timeline",
          headerStyle: { backgroundColor: Themes.colors.background },
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackTitleVisible: false,
        }}
      />

      <Header />
      {/* <View style={styles.title_container}>
        <Text style={styles.title}>Your Fitcast</Text>
      </View> */}
      <View style={styles.timeline}>
        <View style={styles.title_container}>
          <Text style={styles.title}> Your FitCast Timeline </Text>
          <View style={styles.horizontalLine}></View>
        </View>
        <View style={styles.times}>
          <FlatList
            data={testData}
            renderItem={renderRow}
            keyExtractor={(item) => item.time}
          />
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.text}>
          Dress light, but pack warm clothes and an umbrella for later
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: Themes.colors.logoGreen,
    width: "90%",
    marginTop: "3%",
    // Other styles for the horizontal line
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'contain', 'stretch', etc.
    width: windowDimensions.width,
    height: windowDimensions.height,
    position: "absolute",
  },
  title: {
    fontSize: 25,
    color: Themes.colors.logoGreen,
    fontWeight: "bold",
    paddingTop: 15,
    // textShadowColor: "#000", // Outline color
    // textShadowOffset: { width: 1, height: 1 }, // Outline offset
  },
  timeline: {
    width: "90%",
    height: "75%",
    backgroundColor: Themes.colors.logoYellow,
    flexDirection: "column",
    borderRadius: "28%",
    padding: 10,
    alignSelf: "center",
    marginTop: "5%",
    marginBottom: "5%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5.46,
    opacity: 0.8,
  },
  /*line: {
    backgroundColor: Themes.colors.paletOrange,
    flex: 1,
  },*/
  times: {
    flex: 1,
  },
  clothes: {
    flex: 1,
    alignItems: "flex-end",
  },
  title_container: {
    backgroundColor: Themes.colors.logoYellow,
    alignItems: "center",
    paddingBottom: "2%",
    width: "100%",
    alignItems: "center",
  },
  description: {
    backgroundColor: Themes.colors.logoGreen,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "5%",
    paddingHorizontal: "6%",
    alignSelf: "center",
    width: "100%",
    height: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5.46,
    opacity: 0.8,
  },
  text: {
    fontSize: 18,
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
    color: Themes.colors.logoYellow,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Themes.colors.background,
  },
});
