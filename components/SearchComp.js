import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";


const SearchComp = ({ onChangeSelect, filteredData }) => {
  return (
    <View style={styles.main}>
        <ScrollView contentContainerStyle={styles.screen}>
          {filteredData.map((item) => (
            <TouchableOpacity
            key={item}
            onPress={() => onChangeSelect(item)}
            style={styles.textHolder}>
            <Text style={styles.text} key={item}>
              {item}
            </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

    </View>
  );
};

export default SearchComp;

const styles = StyleSheet.create({

  main : {
    height: 300,
  },
  screen: {
    paddingVertical: 10,
  },
  textHolder: {
   borderRadius: 6,
   padding: 10,
   backgroundColor: "#fff",
   marginVertical: 4,
  },
  text: {
    color: "gray",
  }
});
