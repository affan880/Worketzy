import React, { useState,useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import Colors from "../../utils/Colors";
import { useDispatch } from "react-redux";

const dummydata = [
  { label: "Engineering", value: "Engineering" },
  { label: "Software Engineering", value: "Software Engineering" },
  { label: "Android Developer", value: "Android Developer" },
  { label: "Frontend Developer", value: "Frontend Developer" },
  { label: "Backend Developer", value: "Backend Developer" },
  { label: "Data Engineer", value: "Data Engineer" },
  { label: "Security Engineer", value: "Security Engineer" },
];

const DropdownScreen = (_props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(dummydata);
    const [selected, setSelected] = useState([]);
        useEffect(() => {
          fetch("https://worketzy-job-list.herokuapp.com/api/jobList")
            .then((response) => response.json())
            .then((responseJson) => {
              const b = responseJson
                .map((obj) => obj.subtitle)
                .map((res) =>
                  res.map((obj) => ({
                    value: obj.title,
                    label: obj.title,
                  }))
                );
              const merged = [].concat(...b);
              setData(merged);
            });
        }, []);

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16,marginBottom: 15,}} >{_props.Name}</Text>
      <MultiSelect
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        label="Multi Select"
        placeholder="Select item"
        placeholderStyle={{ color: Colors.primary }}
        selectedStyle={{
          borderColor: Colors.secondary,
          margin: 5,
          alignContent: "center",
          borderWidth: 1,
          borderRadius: 5,
        }}
        selectedTextStyle={{
          color: Colors.black,
        }}
        iconColor={Colors.primary}
        search
        searchPlaceholder="Search"
        value={selected}
        onChange={(item) => {
          setSelected(item);
          dispatch(_props.set(item));
        }}
        renderItem={(item) => _renderItem(item)}
        dropdownPosition={"bottom"}
        textError="Error"
      />
    </View>
  );
};

export default DropdownScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: "95%",
  },
  dropdown: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    backgroundColor: Colors.secondary,
    border: Colors.secondary,
    borderBottomWidth: 0.5,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    padding: 10,
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
