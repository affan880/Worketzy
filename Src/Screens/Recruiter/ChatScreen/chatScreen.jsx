import { StyleSheet,View} from "react-native";
import React, { useEffect, useState } from "react";
import { ChannelList } from "stream-chat-expo";
import SafeView from "../../../Components/CustomComponents/safeView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../../redux/reducers/currentUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Spinner from "../../../Components/CustomComponents/spinner";
const ChatScreen = () => {
  const navigation = useNavigation();
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
   const filters = {
     members: {
       $in: [userId],
     },
   };
  useEffect(() => {
    loadCurrentUser();
  }, []);
    const ChannelPressed = (channel) => {
      navigation.navigate("ChattingScreen", { channel });
    };
  return (
    <View style={{flex:1}} >
      {userId ? (
        <ChannelList
          onSelect={(channel) => ChannelPressed(channel)}
          filters={filters}
        />
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
