import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import {Channel, MessageInput, MessageList} from 'stream-chat-expo';
import SafeView from '../CustomComponents/safeView';
import Colors from '../../utils/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ChattingScreen = (props) => {
    const { route } = props;
  const { params: { channel } } = route;
  return (
    <SafeView style={{ flex: 1 }}>
      <Channel channel={channel} keyboardVerticalOffset>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeView>
  );
}

export default ChattingScreen

const styles = StyleSheet.create({
})