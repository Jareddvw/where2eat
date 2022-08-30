import React, { useState, useMemo, Ref, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
  Platform,
  Animated,
} from "react-native";
import TinderCard from "react-tinder-card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card, { rest } from "../components/Card";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { SocketContext } from "../context/socket";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommonActions } from "@react-navigation/native";
import { RootStackParams } from "../App";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type choicesProps = NativeStackScreenProps<RootStackParams, "Choices", "Stack">;

const ChoicesPg = ({ route, navigation }: choicesProps) => {
  const { socket, restaurants, setRestaurants } = useContext(SocketContext);

  const [restaurantList, setRestaurantList] = useState(restaurants);
  const [rightOrLeft, setRightOrLeft] = useState<number>(0.5);
  const [currentIndex, setCurrentIndex] = useState<number>(
    restaurantList.length - 1
  );
  let [animList, setAnimList] = useState(
    restaurantList.map((index) => {
      let mainValue = new Animated.ValueXY();
      let animatedScale = mainValue.x.interpolate({
        inputRange: [-windowWidth / 2, 0, windowWidth / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp",
      });
      let animatedOpacity = mainValue.x.interpolate({
        inputRange: [-windowWidth / 2, 0, windowWidth / 2],
        outputRange: [1, 0, 1],
        extrapolate: "clamp",
      });
      return {
        main: mainValue,
        scale: animatedScale,
        opacity: animatedOpacity,
      };
    })
  );

  const childRefs: any = useMemo(
    () =>
      Array(restaurantList.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const room = route.params.roomName;
  const username = route.params.username;

  const leaveRoom = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "Start" }],
    });
    socket.emit("leave-room", route.params.roomName);
    setRestaurants([]);
    navigation.dispatch(resetAction);
  };

  useEffect(() => {
    animateStuff(restaurantList.length);
  }, []);

  // after we're done with the choices page, going back should only take us to the start screen.
  useEffect(() => {
    if (currentIndex < 0) {
      socket.emit("get-restaurant-list", room);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: "Start" },
            {
              name: "Results",
              params: {
                roomName: room,
                username: username,
              },
            },
          ],
        })
      );
    }
  }, [currentIndex]);

  const swipe = async (dir: string, index: number) => {
    if (currentIndex < 0) return;
    if (childRefs[index] !== null) {
      setCurrentIndex(index - 1);
      animateStuff(index);
      await childRefs[index].current.swipe(dir); // Swipe the card!
      if (dir === "right") {
        socket.emit("yes-vote", room, index, username);
      } else {
        socket.emit("no-vote", room, index, username);
      }
    }
  };

  const animateStuff = (index: number) => {
    if (index - 1 >= 0) {
      Animated.timing(animList[index - 1].main, {
        toValue: { x: windowWidth / 2, y: 0 },
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.outermost}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.blackText}>
            Where
            <Text style={styles.redText}>2</Text>
            Eat
          </Text>
          <View style={styles.partyView}>
            <Text style={styles.partyName}>{route.params.roomName}</Text>
            <Pressable style={{ marginBottom: 0 }} onPress={leaveRoom}>
              <MaterialCommunityIcons
                style={styles.partyName}
                name="exit-run"
              />
            </Pressable>
          </View>
          <Text style={styles.userName}>{route.params.username}</Text>
        </View>
        <View style={styles.cardSection}>
          {animList.length === 0 ? (
            <></>
          ) : (
            restaurantList.map((restaurant: rest, index) => {
              return (
                <TinderCard
                  key={index}
                  preventSwipe={["up", "down"]}
                  swipeRequirementType="velocity"
                  //   swipeThreshold={windowWidth / 3}
                  // onSwipeRequirementFulfilled = {(dir) => {
                  //     if (dir === 'left') {
                  //         setRightOrLeft(0)
                  //     } else if (dir === 'right') {
                  //         setRightOrLeft(1)
                  //     }
                  // }}
                  // onSwipeRequirementUnfulfilled = {() => {
                  //     // setRightOrLeft(0.5)
                  // }}
                  onSwipe={(dir) => {
                    if (dir === "right") {
                      socket.emit("yes-vote", room, index, username);
                    } else {
                      socket.emit("no-vote", room, index, username);
                    }
                    animateStuff(index);
                    setCurrentIndex(index - 1);
                    // setRightOrLeft(0.5)
                    // need to add stuff to remove the old cards
                  }}
                  ref={childRefs[index]}
                >
                  <Animated.View
                    key={index}
                    style={
                      // currentIndex === index ?
                      [
                        styles.cards,
                        {
                          shadowColor: "rgba(0,0,0,0.25)",
                          shadowOpacity: 100,
                          shadowRadius: 4,
                          elevation: 3,
                          shadowOffset: { width: 0, height: 0 },
                        },
                        {
                          transform: [
                            {
                              scale: animList[index].scale,
                            },
                          ],
                        },
                        { opacity: animList[index].opacity },
                      ]
                      // : styles.cards
                    }
                  >
                    <Card key={index} restaurant={restaurant} />
                  </Animated.View>
                </TinderCard>
              );
            })
          )}
        </View>
        <View style={styles.buttonSection}>
          <Pressable
            style={[
              styles.button,
              styles.redButton,
              { opacity: rightOrLeft < 0.5 ? 1 : 0.5 },
            ]}
            onPress={() => swipe("left", currentIndex)}
          >
            <MaterialCommunityIcons
              name="window-close"
              size={32}
              color="white"
            />
          </Pressable>
          <Pressable
            style={[
              styles.button,
              styles.greenButton,
              { opacity: rightOrLeft > 0.5 ? 1 : 0.5 },
            ]}
            onPress={() => swipe("right", currentIndex)}
          >
            <Feather name="check" size={32} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const sizes = {
  headerView: 2,
  cardSection: 10,
  buttonSection: 1,
};

const totalSize = Object.values(sizes).reduce((a, b) => a + b);

const cardSectionHeight = (sizes.cardSection * windowHeight) / totalSize;
const cardHeight = (sizes.cardSection * windowHeight) / (totalSize + 2);

const styles = StyleSheet.create({
  outermost: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    marginLeft: 0,
    marginRight: 0,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 16,
    marginRight: 16,
  },
  headerView: {
    flex: sizes.headerView,
    alignItems: "flex-start",
    marginTop: Platform.OS === "ios" ? 10 : 30,
    justifyContent: "space-between",
  },
  blackText: {
    alignSelf: "flex-start",
    fontSize: 32,
    fontFamily: "Inter",
    fontWeight: "400",
  },
  redText: {
    fontSize: 35,
    fontFamily: "Inter",
    fontWeight: "500",
    color: "#FF0000",
  },
  partyView: {
    alignSelf: "flex-start",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 0,
    marginRight: 0,
  },
  partyName: {
    fontSize: 20,
    fontFamily: "Inter",
    color: "#A3A3A3",
  },
  userName: {
    alignSelf: "flex-start",
    fontSize: 15,
    fontFamily: "Inter",
    color: "#A3A3A3",
  },
  cardSection: {
    marginTop: 19,
    flex: sizes.cardSection,
    height: cardSectionHeight,
    width: windowWidth - 32,
    position: "relative",
  },
  cards: {
    flex: 1,
    backgroundColor: "white",
    // shadowColor: "rgba(0,0,0,0.25)",
    // shadowOpacity: 100,
    // shadowRadius: 4,
    // elevation: 3,
    // shadowOffset: { width: 0, height: 0 },
    height: cardHeight,
    width: windowWidth - 32,
    borderRadius: 15,
    zIndex: 1,
    position: "absolute",
  },
  buttonSection: {
    flex: sizes.buttonSection,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: Platform.OS === "ios" ? 10 : 0,
    zIndex: -100,
  },
  button: {
    height: 39,
    width: 39,
    borderRadius: 39 / 2,
    zIndex: -100,
    elevation: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  redButton: {
    backgroundColor: "#DD0000",
  },
  greenButton: {
    backgroundColor: "#039A00",
  },
  check: {
    height: 39,
    width: 39,
  },
});

export default ChoicesPg;
