import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const getData = (URL,setJobsCreated, setJobsData) => {
        fetch(URL)
          .then((response) => response.json())
          .then((responseJson) => {
              if (responseJson.length === 0) { 
                  setJobsCreated(false);
              }
              else {
                    setJobsCreated(true);
                    setJobsData(responseJson);
              }
          })
          .then(() => {
            return true
          })
          .catch((error) => {
            console.error(error);
          });
}

export default getData

const styles = StyleSheet.create({})