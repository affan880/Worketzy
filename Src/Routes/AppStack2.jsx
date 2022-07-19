  import React,{useState} from "react";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import JobRecruiterAppStack from "./JobRecruiterAppStack";
  import ChattingScreen from "../Components/Stream/chattingScreen";
  import Colors from "../utils/Colors";
  import { StreamChat } from "stream-chat";
  import { OverlayProvider, Chat } from "stream-chat-expo";
  import { onAuthStateChanged, getAuth } from "firebase/auth";
  import { connectUserStream } from "../Functions/connectUserStream";
import Spinner from "../Components/CustomComponents/spinner";
import firebase from "firebase/compat";
import { useEffect } from "react";
import JobApplicantProfile from "../Screens/Recruiter/Profile/JobApplicantProfile";
const Stack = createNativeStackNavigator();

export default function AppStack2() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(true);
    const auth = getAuth();
  const client = StreamChat.getInstance("62n7xxd62q8p");

  firebase.firestore().collection("Companies").doc(firebase.auth().currentUser.uid).get().then((doc) => { 
    setData(doc.data());
    // return doc.data();
  })
  useEffect(() => {
    firebase.auth().currentUser.updateProfile({
      displayName: data.LegalName,
      photoURL: data.Logo,
    })
    console.log("data", data);

   },[])
  onAuthStateChanged(auth, (authUser) => {
      authUser && loading && data
        ? connectUserStream(client, authUser, setLoading)
        : !authUser
        ? client.disconnectUser()
        : null;
    });
  return (
    <Chat client={client}>
      {loading ? (
        <Spinner />
      ) : (
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen
            name="Worketzy"
            component={JobRecruiterAppStack}
            options={{
              headerShown: false,
              navigationBarColor: Colors.secondary,
              statusBarColor: Colors.primary,
              statusBarStyle: Colors.primary,
              keyboardHidesTabBar: true,
            }}
          />

          <Stack.Screen
            name="JobApplicant"
            component={JobApplicantProfile}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: Colors.primary,
                }
              }}
          />
          <Stack.Screen
            name="ChattingScreen"
            component={ChattingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </Chat>
  );
}
