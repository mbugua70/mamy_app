import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'

const HeadComp = () => {
  return (
    <View style={styles.imageContainer}>
       <Image source={require("../assets/image/mamy.png")} width="100%" height="100%" style={styles.image} />
       <Text style={styles.heading}>EYEWEAR</Text>
    </View>
  )
}

export default HeadComp

const styles = StyleSheet.create({
    imageContainer: {
      width: 220,
      height: 50,
    },

    image: {
        width: "100%",
        height: "100%",
    },

    heading: {
      fontSize: 16,
      fontWeight: '600',
      color: "#302d2e",
    }
})