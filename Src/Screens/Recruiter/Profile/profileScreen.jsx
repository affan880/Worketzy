import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../../Components/CustomComponents/safeView'
import Colors from '../../../utils/Colors'

const ProfileScreen = () => {
  return (
    <SafeView  style={{ backgroundColor: Colors.primary, width: "100%", height: "100%" }}>
      <Text>ProfileScreen</Text>
    </SafeView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})