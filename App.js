import React, { Component } from 'react'
import Providers from "./Src/Routes";
import { Provider } from "react-redux";
import store from "./Src/redux/store";
import { app } from "./Src/Components/firebase/firebase";
// import firebase from "firebase/compat/app";

export class App extends Component {
  render() {
    return (
    <Provider store={store} >
       <Providers/>
    </Provider>
    )
  }
}

export default App