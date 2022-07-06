import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SelectDropdown from "react-native-select-dropdown";
import Colors from '../../utils/Colors';
import { Entypo } from '@expo/vector-icons';
const AppSelectdropdown = ({Data, setJobTypeOption, Name, width}) => {
  return (
    <View style={[styles.container, {width}]}>
      <View style={{ flexDirection: "column", width: "100%" }}>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 15,
          }}
        >
          {Name}
        </Text>
        <SelectDropdown
          buttonStyle={{
            backgroundColor: Colors.secondary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "100%",
          }}
          buttonTextStyle={{ color: Colors.primary }}
          defaultButtonText={"Select Job Type"}
          renderDropdownIcon={() => (
            <Entypo name="chevron-down" size={24} color={Colors.primary} />
          )}
          dropdownOverlayColor={Colors.lightGrey}
          dropdownStyle={{
            // width: "80%",
            // height: "35%",
            bottom: 10,
            borderWidth: 1,
            borderColor: Colors.mediumGrey,
            borderRadius: 10,
            padding: 10,
            // alignContent: "center",
            // justifyContent: "center",
            // alignSelf: "center",
          }}
          data={Data}
          onSelect={(selectedItem, index) => {
            setJobTypeOption(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
    </View>
  );
      }
      
      export default AppSelectdropdown
      
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
});