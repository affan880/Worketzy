import { initializeApp } from "firebase/compat";
import * as firebase from "firebase/compat";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
export default app;

