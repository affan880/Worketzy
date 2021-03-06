import React, { useState, useMemo, useEffect } from "react";

import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Picker, onOpen } from "react-native-actions-sheet-picker";
/*
 **Example data:
 */

export default function AppSearchableDropdown() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setData(Country.getAllCountries().some((country) => country.name === "India"));
    console.log(Country)
  }, []);

  /*
   **Example filter function
   * @param {string} filter
   */
  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) =>
        item.name
          .toLocaleLowerCase("en")
          .includes(query.toLocaleLowerCase("en"))
      );
    }
  }, [data, query]);

  /*
   **Input search
   *@param {string} text
   */
  const onSearch = (text) => {
    setQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onOpen("country");
        }}
      >
        <Text>Open ActionSheet</Text>
      </TouchableOpacity>
      <Text style={{ padding: 10 }}>Chosen : {JSON.stringify(selected)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8B93A5",
    padding: 10,
    borderRadius: 6,
    marginTop: 50,
  },
});
