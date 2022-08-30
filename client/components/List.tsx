import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { rest } from "./Card";
import ListItem from "./ListItem";

const List = ({ restaurants }: { restaurants: Array<rest> }) => {
  return (
    <View style={styles.outer}>
      <View style={styles.header}>
        <Text style={styles.topPicks}>Top picks</Text>
        <Text style={styles.voteHeader}>votes</Text>
      </View>
      {restaurants.map((restaurant, index) => (
        <ListItem restaurant={restaurant} index={index} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginTop: 25,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 25,
  },
  header: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  topPicks: {
    flex: 1,
    fontSize: 24,
    fontFamily: "Inter",
  },
  voteHeader: {
    fontSize: 20,
    fontFamily: "Inter",
    color: "#A3A3A3",
  },
});

export default List;
