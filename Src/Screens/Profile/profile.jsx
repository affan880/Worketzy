import { View, Text,Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUserLastName, setuserDetails, setDetails } from '../../redux/reducers/userDetails'
import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile = () => {
//   const dispatch = useDispatch();
//   const details = useSelector((state) => state.userDetails.details);
  
// const getMyObject = async () => {
//     const jsonValue = await AsyncStorage.getItem("@userDetails");
//     dispatch(setDetails(JSON.parse(jsonValue)));
//     console.log(details)
// };
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
    
    </View>
  );
}

export default Profile