import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../utils/Colors';
import SafeView from '../../../Components/CustomComponents/safeView';

const CreateJob = () => {
  return (
    <SafeView
      style={{ backgroundColor: Colors.primary, width: "100%", height: "100%" }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Create Job</Text> 
      </View>
    </SafeView>
  );
}

export default CreateJob

const styles = StyleSheet.create({})