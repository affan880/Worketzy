import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import firebaseConfig from "./firebaseConfig";

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase}
