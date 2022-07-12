import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChannelsList from '../../Components/Stream/channelList';
import SafeView from '../../Components/CustomComponents/safeView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../../redux/reducers/currentUser'
import { useDispatch } from 'react-redux';
import Spinner from '../../Components/CustomComponents/spinner';
const Chats = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
   const loadCurrentUser = async () => {
     try {
       const user = await AsyncStorage.getItem("@CurrentUser");
       setUserId(JSON.parse(user).uid);
       user !== null ? dispatch(setUser(user)) : null;
     } catch (error) {
       console.log(error);
     }
   };
  useEffect(() => { 
    loadCurrentUser()
  }, [])
  return (
    <SafeView >
      { userId ? <ChannelsList userId={userId} /> : <Spinner /> }
    </SafeView>
  );
}

export default Chats
const styles = StyleSheet.create({})