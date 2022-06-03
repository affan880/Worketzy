import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppRadioButton from '../../Components/CustomComponents/appRadioButton'

const RadioButton = ({
  RadioButtonsData,
  name,
  width,
  value,
  setvalue
}) => {
  return (
    <View>
      <AppRadioButton
        RadioButtonsData={RadioButtonsData}
        value={value}
        setvalue={setvalue}
        name={name}
        width={width}
      />
    </View>
  );
};

export default RadioButton

const styles = StyleSheet.create({})