import { View, Text, Alert } from 'react-native'
import React from 'react'
export const post = async (data, url, msg, navigation) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const onResponseSubmitted = () => {
        Alert.alert(
            "Success",
            msg,
            [{ text: "OK", onPress: () => navigation.navigate("Home") }],
            { cancelable: false }
        );
    }
        try {
            await fetch(
              url,
              requestOptions
            ).then((response) => {
              response.json().then(() => {
                  onResponseSubmitted();
              });
            });
        }
        catch (error) {
            console.error(error);
    }
    
    return true;
}

export default post;