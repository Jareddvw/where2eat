import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  Alert,
  Pressable,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

type location = {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: Array<string>;
};
type category = {
  alias: string;
  title: string;
};

type coord = {
  latitude: number;
  longitude: number;
};

export type rest = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Array<category>;
  coordinates: coord;
  transactions: Array<string>;
  rating: number;
  price: string;
  location: location;
  phone: string;
  display_phone: string;
  distance: number;
  yeses: Array<string>;
  nos: Array<string>;
};

const OpenURLButton = ({ url, children }: { url: string; children: any }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const Card = ({ restaurant }: { restaurant: rest }) => {
  const handleClick = () => {
    Linking.canOpenURL(restaurant.url).then((supported) => {
      if (supported) {
        Linking.openURL(restaurant.url);
      } else {
        console.log("Don't know how to open URI: " + restaurant.url);
      }
    });
  };

  const supportedURL = "https://google.com";

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.nameView}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </View>
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
      </View>
      <View style={styles.subHeader}>
        <View style={styles.categories}>
          {restaurant.categories.map((cat, index) => {
            return (
              <Text key={index} style={{ marginRight: 20 }}>
                {cat.title}
              </Text>
            );
          })}
        </View>
        <Text style={styles.price}>{restaurant.price}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: restaurant.image_url }} />
      </View>
      <View style={styles.openAndNumber}>
        <Text style={{ color: restaurant.is_closed ? "#DD0000" : "#039A00" }}>
          {restaurant.is_closed === true ? "Closed" : "Open now"}
        </Text>
        <Text>{restaurant.display_phone}</Text>
      </View>
      <View style={styles.distAndYelp}>
        <View style={styles.distance}>
          <Ionicons name="location-sharp" size={15} color="#FF4040" />
          <Text>
            {" "}
            {Math.round(restaurant.distance * 0.000621371 * 100) / 100} miles
          </Text>
        </View>
        <FontAwesome5 name="yelp" size={15} color="#FF4040" />
      </View>
      <View style={styles.location}>
        <Text>{restaurant.location?.display_address.join(", ")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 15,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameView: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  restaurantName: {
    fontSize: 24,
    color: "black",
    fontFamily: "Inter",
    flex: 1,
    flexWrap: "wrap",
  },
  stars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  subHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  categories: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "Inter",
    fontSize: 14,
    flexWrap: "wrap",
  },
  price: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  imageContainer: {
    flex: 11,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  openAndNumber: {
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distAndYelp: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distance: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  location: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "Inter",
  },
});

export default Card;
