import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SocketContext } from "../context/socket";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../App";

type joinProps = NativeStackScreenProps<RootStackParams, "Join", "Stack">;

const JoinRoom = ({ navigation, route }: joinProps) => {
  let [user, setUser] = useState<string>("");
  let [room, setRoom] = useState<string>("");
  let [errorMessage, setErrorMessage] = useState<string>("");

  const { socket, restaurants, setRestaurants } = useContext(SocketContext);

  useEffect(() => {
    socket.on("error", (message) => {
      setErrorMessage(message);
    });
  }, []);

  useEffect(() => {
    if (restaurants.length == 0 || restaurants[0]["id"] === "sample") return;
    // should then navigate to Choices once get-restaurants is emitted and restaurant-list is returned
    navigation.replace("Choices", {
      roomName: room,
      username: user,
    });
  }, [restaurants]);

  useEffect(() => {
    if (errorMessage !== "") {
      Alert.alert(errorMessage, "", [{ text: "OK" }]);
    }
    setErrorMessage("");
  }, [errorMessage]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTxt}>Join a room</Text>
      <View style={styles.inputArea}>
        <Text style={styles.captionText}>Enter the room name below:</Text>
        <View style={styles.searchSection}>
          <MaterialIcons
            style={styles.searchIcon}
            name="group"
            size={20}
            color="black"
          />
          <TextInput
            style={styles.input}
            placeholder="pickyeaterparty"
            onChangeText={(roomName) => {
              setRoom(roomName);
            }}
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.captionText}>Custom username</Text>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="person-circle-outline"
            size={20}
            color="black"
          />
          <TextInput
            style={styles.input}
            placeholder="tacolover99"
            autoCorrect={false}
            onChangeText={(name) => {
              setUser(name);
            }}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          if (room == "") {
            Alert.alert("Enter a room name!", "", [{ text: "OK" }]);
          } else if (user == "") {
            Alert.alert("Enter a username!", "", [{ text: "OK" }]);
          } else {
            socket.emit("join-room", room);
          }
        }}
      >
        <Text style={styles.buttonTxt}>join room</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  head: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontSize: 32,
    fontFamily: "Inter",
    fontWeight: "400",
  },
  inputArea: {
    marginTop: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  captionText: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 16,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    width: 287,
    borderRadius: 30,
    height: 46,
  },
  searchIcon: {
    padding: 10,
    marginLeft: 2,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 7,
    color: "black",
    fontSize: 20,
    fontFamily: "Inter",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,64,64,1)",
    width: 287,
    height: 43,
    borderRadius: 30,
    marginTop: 71,
    marginBottom: 50,
  },
  buttonTxt: {
    fontSize: 20,
    fontFamily: "Inter",
    fontWeight: "400",
    color: "#FFFFFF",
  },
  errorArea: {
    marginTop: 45,
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },
});

export default JoinRoom;
