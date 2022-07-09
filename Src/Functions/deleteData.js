import { View, Text, Alert } from "react-native";
import React from "react";

export const Delete = async (URL) => {
    fetch(URL, {
        method: 'DELETE'
    }).then(res => {
        console.log(res.status)
    }).then(
        (result) => {
            console.log(result)
        },
        (error) => {
            console.log(error)
        }
    )
    }   

export default Delete;
