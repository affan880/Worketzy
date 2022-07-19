import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import Constants from "expo-constants";
import React, { useState, useEffect } from 'react'
import {Channel, MessageInput, MessageList, ChannelAvatar, Card } from 'stream-chat-expo';
import SafeView from '../CustomComponents/safeView';
import Colors from '../../utils/Colors';
const STATUSBAR_HEIGHT = Constants.statusBarHeight;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ChattingScreen = (props) => {
  const [ChannelTitle, setChannelTitle] = useState("Recruiter");
    const { route } = props;
  const { params: { channel, userId } } = route;
  const getData = async () => { 
    const channelsData = await channel.query({});
    setChannelTitle(channelsData.members[0].user.name);
  }
  useEffect(() => { 
    getData()
  }, [])
  return (
    <SafeView style={{ flex: 1 }}>
      <Channel channel={channel} keyboardVerticalOffset>
        <View
          style={{
            backgroundColor: Colors.white,
            marginTop: STATUSBAR_HEIGHT,
          }}
        >
          <View
            style={{
              width: width,
              height: height * 0.08,
              justifyContent: "center",
              borderBottomColor: Colors.black,
              borderBottomWidth: 0.5,
              justifyContent: "center",
              paddingLeft: 20,
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <ChannelAvatar channel={channel} displayName = {Channel.displayName} />
            <Text style={{
              color: Colors.black,
              fontSize: 18,
              textAlign: "center",
              marginLeft: 20,
              fontWeight: "bold",
            }} > {ChannelTitle} </Text>
          </View>
        </View>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeView>
  );
}

export default ChattingScreen

const styles = StyleSheet.create({
})