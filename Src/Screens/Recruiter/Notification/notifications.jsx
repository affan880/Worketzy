import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../../Components/CustomComponents/safeView'
import Colors from '../../../utils/Colors'

const Notifications = () => {
  return (
    <SafeView  style={{ backgroundColor: Colors.primary, width: "100%", height: "100%" }}>
      <Text>Notifications</Text>
    </SafeView>
  )
}

export default Notifications

const styles = StyleSheet.create({})