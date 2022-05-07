import * as firebase from "firebase";
import * as firestore from 'firebase/firestore'
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { Platform, InteractionManager } from "react-native";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "_lt_" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = (id) => {
    if (typeof id === "string" && id.startsWith("_lt_")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const user = firebase.auth().currentUser;
export const logout = () => auth.signOut();

export const firebaseLogin = async ({ verificationId, verificationCode }) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );
  await firebase.auth().signInWithCredential(credential);


  return true;
};

export const getVerificationId = async ({
  phoneNumber,
  recaptchaVerifierCurrent,
}) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const verificationId = await phoneProvider.verifyPhoneNumber(
    phoneNumber,
    recaptchaVerifierCurrent
  );

  return verificationId;
};

export const Firestore = firebase.firestore();

export const createUserDocument = async (ValidFirstName, ValidLastName) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  if (!user) return;
   const userdetails = {
     firsttName: ValidFirstName,
     lastName: ValidLastName,
     createdAt: new Date(),
   };
  const userRef = Firestore.collection("users").doc(uid);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    userRef.set(userdetails)
      .then(function () {
        console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
  }
};

export const uploadImage = async (image, name, setImageUpload) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const blob = await new Promise((resolve, reject) => {
    const httpReq = new XMLHttpRequest();
    httpReq.onload = function () {
      resolve(httpReq.response);
    };
    httpReq.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    httpReq.responseType = "blob";
    httpReq.open("GET", image, true);
    httpReq.send(null);
  });

  const ref = firebase.storage().ref("userDetails/profilePic/" + uid);
  const snapshot = ref.put(blob);

  snapshot.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    () => {
      console.log("loading");
    },
    (error) => {
      console.log(error);
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((url) => {
        setImageUpload(true)
        console.log("download uri : ", url);
        blob.close();
        return url;
      });
    }
  );
};

