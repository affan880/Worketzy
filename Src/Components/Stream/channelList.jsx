import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { ChannelList, Chat } from 'stream-chat-expo';
import SafeView from '../CustomComponents/safeView';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux/es/exports';
const ChannelsList = ({ userId }) => {
  const navigation = useNavigation();
  const ChannelPressed = (channel) => {
    navigation.navigate("ChattingScreen", { channel });
  };
  const filters = {
    members: {
      $in: [userId],
    },
  };

  return (
    <SafeView>
      <ChannelList
        onSelect={(channel) => ChannelPressed(channel)}
        filters={filters}
      />
    </SafeView>
  );
};

export default ChannelsList

const styles = StyleSheet.create({})