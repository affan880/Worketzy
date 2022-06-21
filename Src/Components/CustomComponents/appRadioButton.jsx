import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { RadioButton} from "react-native-paper";
import Colors from "../../utils/Colors";
//{ radioButtonsData, radioButtonState, setRadioButtonState}
const AppRadioButton = ({value,setValue, radioButtonsData,width, Name}) => {
    return (
      <View style={[Styles.RadioButtonContainer,{width:width}]}>
        <Text style={{ fontSize: 16, marginVertical: 15,marginLeft:15 }}>
          {Name}
        </Text>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
          
        >
          <View style={[{ flexDirection: "row" }, Styles.container]}>
            {radioButtonsData.map((items) => (
              <View
                key={items.id}
                style={[{ flexDirection: "row", alignItems: "center" }]}
              >
                <Text style={Styles.label}>{items.label}</Text>
                <View style={Styles.radioButton}>
                  <RadioButton value={items.value} color={Colors.secondary}  />
                </View>
              </View>
            ))}
          </View>
        </RadioButton.Group>
      </View>
    );
};

export default AppRadioButton;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    display: "flex",
    marginVertical: 4,
    paddingHorizontal: 10,
    width: "100%",
  },
  RadioButtonContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  label: {
    fontSize: 15,
    color: Colors.secondary,
    paddingLeft: 10,
  },
  radioButton: {
    fontSize: 15,
    color: Colors.mediumGrey,
  },
});