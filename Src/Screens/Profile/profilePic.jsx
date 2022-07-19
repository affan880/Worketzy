import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'

const ProfilePic = ({user}) => {
  return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.userImage }} style={styles.image} />
      </View>
  );
}

export default ProfilePic

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 170,
    borderRadius: 20,
},
imageContainer: {
    width: 130,
    height: 170,
    borderRadius: 20,
    backgroundColor: Colors.white,
    },
});