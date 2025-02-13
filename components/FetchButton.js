import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import { GlobalStyles } from "../Constants/Globalcolors";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const FetchButton = ({ onPress, isFetching }) => {
  return (
    <View style={styles.screen}>
      {isFetching && (
        <ActivityIndicator animating={true} color={MD2Colors.blueGrey900} size="large" />
      )}
      {!isFetching && (
        <Pressable onPress={onPress}>
          <Avatar.Icon size={48} icon='cloud-download' style={styles.avatar} />
        </Pressable>
      )}
    </View>
  );
};

export default FetchButton;

const styles = StyleSheet.create({
  screen: {
    padding: 8,
  },
  avatar: {
    backgroundColor: GlobalStyles.colors.primary50,
  },
});
