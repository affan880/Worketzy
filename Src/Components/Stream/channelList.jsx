import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { ChannelList, Chat } from 'stream-chat-expo';
import SafeView from '../CustomComponents/safeView';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux/es/exports';
import firebase from 'firebase/compat';
const ChannelsList = ({ userId }) => {
  const navigation = useNavigation();
  const ChannelPressed = (channel, userId) => {
    navigation.navigate("ChattingScreen", { channel, userId });
  };
  const filters = {
    members: {
      $in: [userId],
    },
  };

  return (
    <SafeView>
      <ChannelList
        onSelect={(channel) => ChannelPressed(channel, userId)}
        filters={filters}
      />
    </SafeView>
  );
};

export default ChannelsList

const styles = StyleSheet.create({})