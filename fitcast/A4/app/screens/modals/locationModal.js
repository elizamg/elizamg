import Modal from "react-native-modal";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import MapView from "react-native-maps";
import { useState, useRef } from "react";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { ClothingItem } from "../../components/locationClothingItem";
import Location from "../../../assets/Images/location.png";
import { Themes } from "../../../assets/Themes";
const windowDimensions = Dimensions.get("window");

const LocationModal = (props) => {
  const scrollViewRef = useRef();

  let isLocationModalVisible = props.isLocationModalVisible;
  const onLocationToggleModal = props.onLocationToggleModal;
  const onLocationCloseModal = props.onLocationCloseModal;

  const setLocationModalVisible = () => {
    onLocationCloseModal();
  };

  const [text1, onChangeText1] = React.useState("");
  const [text2, onChangeText2] = React.useState("");

  const [isFeelingClicked, setIsFeelingClicked] = useState(false);
  const [isFeelingClicked2, setIsFeelingClicked2] = useState(false);
  const [isFeelingClicked3, setIsFeelingClicked3] = useState(false);
  const [isInside, setIsInside] = React.useState(false);
  const [isOutside, setIsOutside] = React.useState(false);
  const [resetClothingItems, setResetClothingItems] = useState(false);

  const resetAllFields = () => {
    onChangeText1("");
    onChangeText2("");
    setIsFeelingClicked(false);
    setIsFeelingClicked2(false);
    setIsFeelingClicked3(false);
    setIsInside(false);
    setIsOutside(false);
    setResetClothingItems((prev) => !prev);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handleInsideOutside = (response) => {
    switch (response) {
      case "Inside":
        setIsInside(true);
        setIsOutside(false);
        break;
      case "Outside":
        setIsInside(false);
        setIsOutside(true);
        break;
      default:
        break;
    }
  };
  const handleTemperaturePref = (preference) => {
    switch (preference) {
      case "Too Hot":
        setIsFeelingClicked(true);
        setIsFeelingClicked2(false);
        setIsFeelingClicked3(false);
        break;
      case "Just Right":
        setIsFeelingClicked(false);
        setIsFeelingClicked2(true);
        setIsFeelingClicked3(false);
        break;
      case "Too Cold":
        setIsFeelingClicked(false);
        setIsFeelingClicked2(false);
        setIsFeelingClicked3(true);
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    resetAllFields();
    // setLocationModalVisible(false);
    onLocationToggleModal();
  };
  return (
    <Modal
      propagateSwipe={true}
      isVisible={isLocationModalVisible}
      onSwipeComplete={() => setLocationModalVisible(false)}
      swipeDirection="down"
    >
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Log Your Location</Text>
          <TouchableOpacity onPress={setLocationModalVisible}>
            <Entypo
              name="cross"
              size={50}
              color={Themes.colors.fitcastGray}
              justifyContent="flex-end"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.separator} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity>
            <View style={styles.mapContainer}>
              <View style={styles.questionContainer}>
                {/* <Text style={styles.question}>Pin this location?</Text> */}
              </View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 37.42631303388066,
                  longitude: -122.17179519196625,
                  latitudeDelta: 0.00222,
                  longitudeDelta: 0.00121,
                }}
              />
            </View>
            <View style={styles.userAnswerContainer}>
              <View style={styles.locationNameQuestionContainer}>
                <View style={styles.questionContainer}>
                  <Text style={styles.locationNameQuestion}>
                    Name this location:
                  </Text>
                </View>
                <TextInput
                  style={styles.locationTextInput}
                  onChangeText={onChangeText1}
                  value={text1}
                />
              </View>
              <View style={styles.titleContainer}></View>
              <View style={styles.titleContainer}>
                <View style={styles.separator1} />
              </View>
              <View style={styles.questionContainer}>
                <Text style={styles.locationNameQuestion}>Where are you?</Text>
              </View>
              <TouchableOpacity onPress={() => handleInsideOutside("Inside")}>
                {!isInside && (
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Inside</Text>
                  </View>
                )}
                {isInside && (
                  <View style={styles.buttonClicked}>
                    <Text style={styles.buttonTextClicked}>Inside</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleInsideOutside("Outside")}>
                {!isOutside && (
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Outside</Text>
                  </View>
                )}
                {isOutside && (
                  <View style={styles.buttonClicked}>
                    <Text style={styles.buttonTextClicked}>Outside</Text>
                  </View>
                )}
              </TouchableOpacity>
              {/* <Text style={styles.question}>
                Additional Info (ie lecture hall, in the shade/sun)
              </Text> */}
              <View style={styles.titleContainer}>
                <View style={styles.separator1} />
              </View>
              <View style={styles.questionContainer}>
                <Text style={styles.locationNameQuestion}>
                  Additional Info (ie lecture hall, in the shade/sun)
                </Text>
              </View>
              <TextInput
                style={styles.locationTextInput}
                onChangeText={onChangeText2}
                value={text2}
              />
              <View style={styles.titleContainer}>
                <View style={styles.separator1} />
              </View>
              <View style={styles.questionContainer}>
                <Text style={styles.locationNameQuestion}>Clothing?</Text>
              </View>
              <View style={styles.clothingItemsSelectorContainer}>
                <View style={styles.clothingItemsSelectorRow}>
                  <ClothingItem
                    style={styles.clothingIconSize}
                    reset={resetClothingItems}
                    itemName="Shirt"
                    itemImage={require("../../../assets/Images/shirtIcon.png")}
                  ></ClothingItem>
                  <ClothingItem
                    style={styles.clothingIconSize}
                    reset={resetClothingItems}
                    itemName="Shorts"
                    itemImage={require("../../../assets/Images/shortsIcon.png")}
                  ></ClothingItem>
                  <ClothingItem
                    style={styles.clothingIconSize}
                    reset={resetClothingItems}
                    itemName="Jacket"
                    itemImage={require("../../../assets/Images/jacketIcon.png")}
                  ></ClothingItem>
                </View>
                <View style={styles.clothingItemsSelectorRow}>
                  <ClothingItem
                    style={styles.clothingIconSize}
                    reset={resetClothingItems}
                    itemName="Pants"
                    itemImage={require("../../../assets/Images/pantsIcon.png")}
                  ></ClothingItem>
                  <ClothingItem
                    style={styles.clothingIconSize}
                    reset={resetClothingItems}
                    itemName="Tank Top"
                    itemImage={require("../../../assets/Images/tankIcon.png")}
                  ></ClothingItem>
                  <ClothingItem
                    style={styles.clothingIconSize}
                    reset={resetClothingItems}
                    itemName="Sunglasses"
                    itemImage={require("../../../assets/Images/sunglassIcon.png")}
                  ></ClothingItem>
                </View>
              </View>
              <View style={styles.titleContainer}>
                <View style={styles.separator1} />
              </View>
            </View>
            <View style={styles.feelingSelectionContainer}>
              <View style={styles.questionContainer}>
                <Text style={styles.locationNameQuestion}>
                  How are you feeling?
                </Text>
              </View>
              <View style={styles.temperatureView}>
                <TouchableOpacity
                  onPress={() => handleTemperaturePref("Too Hot")}
                >
                  {!isFeelingClicked && (
                    <View style={styles.temperaturePrefButton}>
                      <Text style={styles.temperaturePrefText}>Too Hot</Text>
                    </View>
                  )}
                  {isFeelingClicked && (
                    <View style={styles.temperaturePrefButtonClicked}>
                      <Text style={styles.temperaturePrefTextClicked}>
                        Too Hot
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTemperaturePref("Just Right")}
                >
                  {!isFeelingClicked2 && (
                    <View style={styles.temperaturePrefButton}>
                      <Text style={styles.temperaturePrefText}>Just Right</Text>
                    </View>
                  )}
                  {isFeelingClicked2 && (
                    <View style={styles.temperaturePrefButtonClicked}>
                      <Text style={styles.temperaturePrefTextClicked}>
                        Just Right
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTemperaturePref("Too Cold")}
                >
                  {!isFeelingClicked3 && (
                    <View style={styles.temperaturePrefButton}>
                      <Text style={styles.temperaturePrefText}>Too Cold</Text>
                    </View>
                  )}
                  {isFeelingClicked3 && (
                    <View style={styles.temperaturePrefButtonClicked}>
                      <Text style={styles.temperaturePrefTextClicked}>
                        Too Cold
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.titleContainer}>
                <View style={styles.separator1} />
              </View>
            </View>
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity onPress={onSubmit}>
                <View style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1.5,
    backgroundColor: Themes.colors.fitcastGray,
    width: "100%",
    marginBottom: "1%",
  },
  separator1: {
    height: 1.5,
    backgroundColor: Themes.colors.fitcastGray,
    width: "100%",
    marginVertical: "3%",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    height: 1200,
    width: "90%",
    // alignItems: "center",
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: windowDimensions.width * 0.85,
    height: windowDimensions.height * 0.75,
    backgroundColor: Themes.colors.logoGreen,
    alignSelf: "center",
    borderRadius: 20,
  },
  titleContainer: {
    marginTop: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    width: "100%",
  },
  map: {
    width: "80%",
    height: "90%",
    borderRadius: "10%",
    //borderWidth: 2,
    //borderColor: Themes.colors.fitcastGray,
  },
  mapContainer: {
    marginBottom: "0%",
    alignItems: "center",
    justifyContent: "center",
    height: windowDimensions.height * 0.2,
    width: "100%",
  },

  title: {
    color: Themes.colors.logoYellow,
    fontWeight: "bold",
    fontSize: 25,
  },

  divider: {
    width: 50,
    height: 1,
    margin: 20,
    backgroundColor: Themes.colors.logoYellow,
  },
  question: {
    color: Themes.colors.logoYellow,
    fontSize: 20,
    padding: 10,
  },
  questionContainer: {
    width: "80%",
    marginVertical: "2%",
    justifyContent: "flex-start",
  },
  locationImage: { resizeMode: "contain", width: 270 },
  userAnswerContainer: {
    padding: 5,
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  locationNameQuestionContainer: {
    // flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  locationNameQuestion: {
    fontSize: 20,
    color: Themes.colors.logoYellow,
  },
  locationTextInput: {
    height: 40,
    width: 250,
    margin: 12,
    padding: 10,
    borderRadius: 4,
    backgroundColor: Themes.colors.logoYellow,
  },
  feelingSelectionContainer: {
    alignItems: "center",
  },
  button: {
    borderWidth: 3,
    borderColor: Themes.colors.logoYellow,
    width: 200,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  buttonClicked: {
    borderWidth: 3,
    borderColor: Themes.colors.logoYellow,
    backgroundColor: Themes.colors.logoYellow,
    width: 200,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    color: Themes.colors.logoYellow,
  },
  buttonTextClicked: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    color: Themes.colors.logoGreen,
  },
  clothingIconSize: {
    resizeMode: "contain",
    width: 10,
    height: 10,
  },
  clothingItem: {
    flex: 1,
    maxWidth: "25%", // 100% devided by the number of rows you want
    alignItems: "center",

    // my visual styles; not important for the grid
    padding: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
  },
  clothingItemsSelectorContainer: {
    backgroundColor: Themes.colors.logoYellow,
    borderRadius: 20,
    marginBottom: "5%",
    padding: 5,
    // flex: 1,
    flexDirection: "column",
    width: "95%",
    // height: 200,
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  clothingItemsSelectorRow: {
    flexDirection: "row",
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
  },
  temperaturePrefButton: {
    borderWidth: 3,
    borderColor: Themes.colors.logoYellow,
    width: 200,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  temperaturePrefButtonClicked: {
    borderWidth: 3,
    borderColor: Themes.colors.logoYellow,
    backgroundColor: Themes.colors.logoYellow,
    width: 200,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  temperaturePrefText: {
    fontSize: 18,
    alignSelf: "center",
    color: Themes.colors.logoYellow,
  },
  temperaturePrefTextClicked: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    color: Themes.colors.logoGreen,
  },
  submitButton: {
    // position: "absolute",
    //bottom: 0,
    //right: 0,
    width: 70,
    backgroundColor: Themes.colors.logoYellow,
    marginRight: 15,
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Themes.colors.logoGreen,
  },
  submitButtonText: {
    color: Themes.colors.logoGreen,
  },
  submitButtonContainer: {
    height: 50,
  },
});

export { LocationModal };
