import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../Constants/Globalcolors'

const ProfilePic = () => {
  return (
    <View style={styles.screen}>
       <Image source={require('../assets/user.png')} style={styles.image}/>
    </View>
  )
}

export default ProfilePic

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
    },

    screen: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#f3f1f0",
        justifyContent: "center",
        alignItems: "center",
    },

})