import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { rest } from "./Card";
import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";
import emojiMap from "./emojiMap";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const windowWidth: number = Dimensions.get("window").width;

const ListItem = ({
  restaurant,
  index,
}: {
  restaurant: rest;
  index: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("🍴");

  useEffect(() => {
    let emoji = "🍴";
    for (let i = 0; i < restaurant.categories.length; i += 1) {
      if (emoji !== "🍴") return;
      var alias: string = restaurant.categories[i]["alias"];
      if (alias in emojiMap && emojiMap[alias] !== "") {
        emoji = emojiMap[alias];
        setEmoji(emojiMap[alias]);
      }
    }
  }, [restaurant]);

  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(restaurant.url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(restaurant.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${restaurant.url}`, "", [
        { text: "OK" },
      ]);
    }
  };

  const handlePhonePress = async () => {
    const supported = await Linking.canOpenURL(`tel:${restaurant.phone}`);
    if (supported) {
      await Linking.openURL(`tel:${restaurant.phone}`);
    }
  };

  const handleAddressPress = async () => {
    const supported = await Linking.canOpenURL(
      `maps://?q=${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`
    );
    if (supported) {
      await Linking.openURL(
        `maps://?q=${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`
      );
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
        <Animated.View style={styles.row} layout={Layout}>
          <View style={styles.left}>
            <Text style={styles.emoji}>{emoji}</Text>
            <View style={styles.headerView}>
              <Text style={styles.title}>{restaurant.name}</Text>
              <View style={styles.subtitle}>
                <Text style={styles.price}>{restaurant.price}</Text>
                <Ionicons name="location-sharp" size={15} color="#FF4040" />
                <Text style={styles.price}>
                  {" "}
                  {Math.round(restaurant.distance * 0.000621371 * 100) /
                    100}{" "}
                  miles
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.empty}></View>
            {restaurant.nos.length + restaurant.yeses.length <= 15 ? (
              <View style={styles.dotArea}>
                {restaurant.yeses.map((yes) => {
                  return <View style={[styles.dot, styles.yesDot]}></View>;
                })}
                {restaurant.nos.map((no) => {
                  return <View style={[styles.dot, styles.noDot]}></View>;
                })}
              </View>
            ) : (
              <View style={styles.dotArea}>
                {restaurant.yeses.map((yes) => {
                  return <View style={[styles.line, styles.yesDot]}></View>;
                })}
                {restaurant.nos.map((no) => {
                  return <View style={[styles.line, styles.noDot]}></View>;
                })}
              </View>
            )}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>

      {open && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          layout={Layout}
          style={styles.bottom}
        >
          <Image style={styles.image} source={{ uri: restaurant.image_url }} />
          <View style={styles.starArea}>
            <View style={styles.stars}>
              {[...Array(5)].map((e, i) => {
                if (i > Math.round(restaurant.rating) - 1) {
                  return (
                    <AntDesign key={i} name="star" size={20} color="#C5C2C2" />
                  );
                } else if (i + 0.5 >= restaurant.rating) {
                  return (
                    <FontAwesome5
                      key={i}
                      name="star-half-alt"
                      size={18}
                      color="#FF0000"
                    />
                  );
                } else {
                  return (
                    <AntDesign key={i} name="star" size={20} color="#FF0000" />
                  );
                }
              })}
              <Text style={{ color: "#C5C2C2", fontSize: 12 }}>
                {"   (" + restaurant.review_count})
              </Text>
            </View>
            <View style={styles.emptyStars}>
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "This link will take you to Yelp.",
                    "Are you sure?",
                    [
                      {
                        text: "Yes, take me there!",
                        onPress: () => handlePress(),
                      },
                      { text: "Cancel" },
                    ]
                  );
                }}
                style={{ marginRight: 5 }}
              >
                <FontAwesome5 name="yelp" size={20} color="#FF4040" />
              </Pressable>
            </View>
          </View>
          <View style={styles.categories}>
            {restaurant.categories.map((cat, index) => {
              return (
                <Text key={index} style={{ marginRight: 20 }}>
                  {cat.title}
                </Text>
              );
            })}
          </View>
          <View style={styles.openAndNumber}>
            <Text
              style={{ color: restaurant.is_closed ? "#DD0000" : "#039A00" }}
            >
              {restaurant.is_closed === true ? "Closed" : "Open now"}
            </Text>
            <Pressable onPress={handlePhonePress}>
              <Text>{restaurant.display_phone}</Text>
            </Pressable>
          </View>
          <View style={styles.location}>
            <Pressable
              onPress={() => {
                Alert.alert(
                  "This link will take you to Maps.",
                  "Are you sure?",
                  [
                    {
                      text: "Yes, take me there!",
                      onPress: () => handleAddressPress(),
                    },
                    { text: "Cancel" },
                  ]
                );
              }}
            >
              <Text>{restaurant.location?.display_address.join(", ")}</Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 87,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    borderTopWidth: 1,
    borderColor: "rgba(155, 155, 155, 0.25)",
  },
  left: {
    flex: 1,
    flexDirection: "row",
  },
  emoji: {
    fontSize: 36,
    fontFamily: "Inter",
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter",
    marginBottom: 6,
  },
  headerView: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  subtitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  price: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#A3A3A3",
    marginRight: 15,
  },
  locationIcon: {
    color: "#FF4040",
  },
  right: {
    flex: 1,
    flexDirection: "row",
  },
  empty: {
    flex: 1,
  },
  dotArea: {
    flex: 3,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dot: {
    width: 17,
    height: 17,
    borderRadius: 17 / 2,
    margin: 2.5,
  },
  yesDot: {
    backgroundColor: "#039A00",
  },
  noDot: {
    backgroundColor: "#DD0000",
  },
  line: {
    width: 7,
    height: 7,
    borderRadius: 7 / 2,
    margin: 2,
  },
  bottom: {
    marginLeft: 16,
    marginRight: 16,
  },
  image: {
    height: 200,
    width: windowWidth - 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  stars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  emptyStars: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  starArea: {
    flexDirection: "row",
    marginBottom: 10,
  },
  categories: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "Inter",
    fontSize: 14,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  openAndNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  location: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "Inter",
    marginBottom: 15,
  },
});

export default ListItem;
