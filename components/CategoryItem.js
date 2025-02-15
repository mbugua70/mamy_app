import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Platform,
    Image,
  } from "react-native";

  const CategoryItem = ({ onNavigate, title, color}) => {
    return (
      <View style={styles.gridNavItem}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.buttonContainer,
            pressed ? styles.pressedButton : null,
          ]}
          onPress={onNavigate}
        >
          <View style={[styles.innerGridContainer, {backgroundColor: color}]}>
            <View style={styles.imageContainer}>
               {/* icon */}
               <Image source={require("../assets/image/sunglases.png")}  style={styles.image}/>
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  export default CategoryItem;

  const styles = StyleSheet.create({
    gridNavItem: {
      marginTop: 18,
      width: "48%",
      height: 150,
      borderRadius: 16,
      elevation: 8,
      shadowRadius: 8,
      shadowColor: "#fff",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      overflow: Platform.OS === "android" ? "hidden" : "visible",
    },

    buttonContainer: {
      flex: 1,
      height: "100%",
    },
    pressedButton: {
      opacity: 0.75,
    },

    innerGridContainer: {
      fllex: 1,
      height: "100%",
      padding: 16,
      borderRadius: 8,
      justifyContent: "space-between",
      // alignItems: "center",
    },

    title: {
      fontWeight: "bold",
      fontSize: 16,
      color: "#f3f1f0",
    },

    imageContainer: {
      alignItems: "flex-start",
      backgroundColor: "#f3f1f0",
      borderRadius: 16,
      width: 32,
      height: 32,
      padding: 4,
    },

    image: {
      width: "100%",
      height: "100%",
    }
  });
