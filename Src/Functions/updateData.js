import { View, Text, Alert } from "react-native";
import React from "react";
export const UpdateViewCount = async (data, url) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    await fetch(url, requestOptions).then((response) => {
      response.json().then(() => {
        console.log("success");
      });
    });
  } catch (error) {
    console.error(error);
  }

  return true;
};
export const UpdateAplications = async (url, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    await fetch(url, requestOptions).then((response) => {
      response.json().then(() => {
        console.log("success");
      });
    });
  } catch (error) {
    console.error(error);
  }

  return true;
};
