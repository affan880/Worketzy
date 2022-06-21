import React, { useState, useMemo, useEffect } from "react";
import Colors from "../../utils/Colors";
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Picker, onOpen } from "react-native-actions-sheet-picker";

export default function FlatListDropDown() {
  const [data, setData] = useState(JobType
  );
  const [selected, setSelected] = useState(undefined);
  const [query, setQuery] = useState("");
  const JobType = [
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
  ];

    useEffect(() => {
       fetch("https://worketzy-job-list.herokuapp.com/api/jobList")
         .then((response) => response.json())
         .then((responseJson) => {
           const b = responseJson
             .map((obj) => obj.subtitle)
             .map((res) =>
               res.map((obj) => ({
                 id: obj.id,
                 name: obj.title,
               }))
             );
           const merged = [].concat(...b);
           setData(merged);
         });
  }, []);
  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) =>
        item.name
          .toLocaleLowerCase("en")
          .includes(query.toLocaleLowerCase("en"))
      );
    }
  }, [data, query]);

  const onSearch = (text) => {
    setQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onOpen("JobType");
        }}
      >
        <Text style={{ color: Colors.primary }}>Open ActionSheet</Text>
      </TouchableOpacity>
      <Picker
        id="JobType"
        data={filteredData}
        inputValue={query}
        searchable={true}
        label="Select type of job"
        setSelected={setSelected}
        onSearch={onSearch}
      />
    </SafeAreaView>
  );
}

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
  button: {
      backgroundColor: Colors.secondary,
      height:"50%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "95%",
  },
});