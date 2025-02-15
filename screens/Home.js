import { View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import React from "react";

import CategoryItem from "../components/CategoryItem";
import OfflineComp from "../components/OfflineComp";

const Home = ({ navigation }) => {
  function handleNavigation() {
    navigation.navigate("Corporate Mapping");
  }

  function handleMeetingBooking() {
    navigation.navigate("Corporate Meetings Booked");
  }

  function handleNavigationRecord() {
    navigation.navigate("Eye Clinics Booked");
  }

  function handleMeetingOutcome() {
    navigation.navigate("Meetings Outcome");
  }

  return (
    <>
      <StatusBar hidden={true} />

      <ScrollView style={styles.screen}>
        <View style={styles.screenContainer}>
        <CategoryItem
          color='#302d2e'
          title='Corporate Mapping'
          onNavigate={handleNavigation}
        />

        <CategoryItem
          color='#302d2e'
          title='Corporate Meetings Booked'
          onNavigate={handleMeetingBooking}
        />

        <CategoryItem
          color='#302d2e'
          title='Eye Clinics Booked'
          onNavigate={handleNavigationRecord}
        />

        <CategoryItem
          color='#302d2e'
          title='Meetings Outcome'
          onNavigate={handleMeetingOutcome}
        />
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 20,
  },
  screenContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  }
});
