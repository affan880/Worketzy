import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-paper';
import Colors from '../../utils/Colors';

const AppToggleBtn = ({student, onPress, width, name}) => {
  return (
    <View style={[Styles.container, { width: width }]}>
      <Text style={Styles.label}>{name}</Text>
      <View style={Styles.radioButton}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={student ? Colors.secondary : "#f4f3f4"}
          onValueChange={onPress}
          value={student}
        />
      </View>
    </View>
  );
};
export default AppToggleBtn

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: "row",
    display: "flex",
    marginVertical: 4,
    alignItems: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    paddingHorizontal:10
  },
  label: {
    fontSize: 15,
    color: Colors.secondary,
    
  },
  radioButton: {
    width: "65%",
    fontSize: 15,
    color: Colors.mediumGrey,
  },
});