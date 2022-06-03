import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { RadioButton,t } from "react-native-paper";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import Colors from "../../utils/Colors";
//{ radioButtonsData, radioButtonState, setRadioButtonState}
const AppRadioButton = () => {
    const [value, setValue] = React.useState(null);
    const radioButtonsDataa = [{
        id: "1",
        label: "Former",
        value: 'former'
        },
        {
            id: "2",
            label: "Current",
            value:"current"
        }
    
    ]

    return (
      <View style={{ borderColor: Colors.secondary, borderWidth: 1 }}>
        <Text style={{fontSize:'16'}} >Are you a Current or Former Employee ? </Text>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View style={[{ flexDirection: "row" }, Styles.container]}>
            {radioButtonsDataa.map((items) => (
              <View
                key={items.id}
                style={[{ flexDirection: "row", alignItems: "center" }]}
              >
                <Text style={Styles.label}>{items.label}</Text>
                <View style={Styles.radioButton}>
                  <RadioButton value={items.value} />
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
    alignItems: "center",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 15,
    color: Colors.secondary,
    marginRight:"70%"
  },
  radioButton: {
    fontSize: 15,
    color: Colors.mediumGrey,
  },
});