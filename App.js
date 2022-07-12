import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import store from "./Src/redux/store";
import { app } from "./Src/Components/firebase/firebase";
import JobTypeSelectorRoute from "./Src/Routes/Routes";
import { StreamChat } from "stream-chat";
import { LogBox } from "react-native";
import { OverlayProvider, Chat } from "stream-chat-expo";

export const App = () => {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews", 
    "Consecutive calls to connectUser is detected, ideally you should only call this function once in your app",
  ];
  LogBox.ignoreLogs(ignoreWarns);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <OverlayProvider>
    <Provider store={store}>
    <JobTypeSelectorRoute />
    </Provider>
    </OverlayProvider>
    </GestureHandlerRootView>
  );
};

export default App;
