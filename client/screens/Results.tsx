import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParams } from "../App";
import { SocketContext } from "../context/socket";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import sampleData from "../components/sampleData";
import List from "../components/List";
import { CommonActions } from "@react-navigation/native";

type resultsProps = NativeStackScreenProps<RootStackParams, "Results", "Stack">;

const Results = ({ navigation, route }: resultsProps) => {
  let { socket, restaurants, setRestaurants } = useContext(SocketContext);

  const leaveRoom = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "Start" }],
    });
    socket.emit("leave-room", route.params.roomName);
    setRestaurants([]);
    navigation.dispatch(resetAction);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.blackText}>
          Where
          <Text style={styles.redText}>2</Text>
          Eat
        </Text>
        <View style={styles.partyView}>
          <Text style={styles.partyName}>{route.params.roomName}</Text>
          <Pressable style={{ marginBottom: 0 }} onPress={leaveRoom}>
            <MaterialCommunityIcons style={styles.partyName} name="exit-run" />
          </Pressable>
        </View>
        <Text style={styles.members}>
          {restaurants[0].yeses && restaurants[0].nos
            ? restaurants[0].yeses.size + restaurants[0].nos.size
            : 0}{" "}
          members
        </Text>
      </View>
      <List restaurants={restaurants} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  headerView: {
    // flex:sizes.headerView,
    alignItems: "flex-start",
    marginTop: Platform.OS === "ios" ? 48 : 30,
    justifyContent: "space-between",
    height: 110,
    marginLeft: 16,
    marginRight: 16,
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
  },
  partyName: {
    fontSize: 20,
    fontFamily: "Inter",
    color: "#A3A3A3",
    marginTop: 10,
  },
  members: {
    alignSelf: "flex-start",
    fontSize: 15,
    fontFamily: "Inter",
    color: "#A3A3A3",
    marginTop: 10,
  },
});

export default Results;
