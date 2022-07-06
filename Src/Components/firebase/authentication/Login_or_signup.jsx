import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseLogin } from "../../../Components/firebase/authentication/firebaseLogin";
import { getVerificationId } from "../../../Components/firebase/authentication/verificationCode";
import firebaseConfig from "../../../Components/firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Form from "../../../Components/forms/form";
import FormErrorMessage from "../../../Components/forms/formErrorMessage";
import FormButton from "../../../Components/forms/formButton";
import FormField from "../../../Components/forms/formField";
import SafeView from "../../../Components/CustomComponents/safeView";
import Spinner from "../../../Components/CustomComponents/spinner";
import Colors from "../../../utils/Colors";
import { setApplicationType } from "../../../redux/reducers/userDetails";
import { setUser } from "../../../redux/reducers/currentUser";
import { setUidForJobInfo } from "../../../redux/reducers/jobInfo";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat";
import {
  validationSchemaPhone,
  validationSchemaCode,
} from "../../../Validation/InputValidation";

let RESEND_OTP_TIME_LIMIT = 30;
let resendOtpTimerInterval;

export default function LoginScreen({Screen}) {
  const dispatch = useDispatch();
  const ApplicationType = useSelector(
    (state) => state.userDetails.applicationType
  );
  const recaptchaVerifier = useRef(null);
  const [loginError, setLoginError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [verificationCodeLoading, setVerificationCodeLoading] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  );
  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  useEffect(() => { 
    loadCurrentUser(); 
  },[])

  const storeCurrentUser = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      await AsyncStorage.setItem("@CurrentUser", JSON.stringify({
        uid: currentUser.uid,

      }));
      loadCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };
  const loadCurrentUser = async () => { 
    try {
      console.log("Loading Current User");
      const user = await AsyncStorage.getItem("@CurrentUser");
      user !== null ? dispatch(setUser(user)) : null;
      console.log("Current User", user);
    } catch (error) {
      console.log(error);
    }
  }
    const storeType = async (ApplicationType) => {
      try {
        await AsyncStorage.setItem("@ApplicationType", ApplicationType);
      } catch (e) {
        console.log("Error saving data userType");
      }
    };

  function startResendOtpTimer() {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  }

  async function handleGetVerificationId(values) {
    dispatch(setApplicationType(Screen));
    const { phoneNumber } = values;
    const recaptchaVerifierCurrent = recaptchaVerifier.current;
    setVerificationCodeLoading(false);
    try {
      let verificationId = await getVerificationId({
        phoneNumber,
        recaptchaVerifierCurrent,
      });
      setPhoneNumber(phoneNumber);
      setVerificationId(verificationId);
      startResendOtpTimer();
    } catch (error) {
      setCodeError(error.message);
    }
    finally {
      setVerificationCodeLoading(false);
    }
  }

  async function handleLogin(values) {
    const { verificationCode } = values;
    try {
      setVerifyingCode(true);
      await firebaseLogin({ verificationCode, verificationId });
      storeCurrentUser();
    } catch (error) {
      setLoginError(error.message);
    
    }
    finally {
      dispatch(setUser({
        uid: firebase.auth().currentUser.uid,
      }));
      dispatch(setUidForJobInfo(firebase.auth().currentUser.uid));
      
      storeType(ApplicationType)
      setVerifyingCode(false);
    }
  }

  return (
    <SafeView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />

      {!verificationId && (
        <Form
          initialValues={{ phoneNumber: "" }}
          validationSchema={validationSchemaPhone}
          onSubmit={async (values) => await handleGetVerificationId(values)}
        >
          <FormField
            name="phoneNumber"
            Name="Send Code"
            leftIcon="phone"
            placeholder="Enter phone number"
            autoCapitalize="none"
            keyboardType="phone-pad"
            autoFocus={true}
          />
          {
            verificationCodeLoading ? <Spinner/> : (
              <FormButton title={"send code"} color={Colors.secondary} />
            )
          }
          {<FormErrorMessage error={codeError} visible={true} />}
        </Form>
      )}
      {verificationId && (
        <Form
          initialValues={{ verificationCode: "" }}
          validationSchema={validationSchemaCode}
          onSubmit={async (values) => await handleLogin(values)}
        >
          <FormField
            name="verificationCode"
            placeholder="Enter code"
            autoCapitalize="none"
            keyboardType="phone-pad"
            Name="Verification Code"
            autoFocus={true}
          />
          <View style={styles.flexRow}>
            <Text
              style={styles.resendText}
              onPress={() => {
                setVerificationId(null);
                setPhoneNumber(null);
              }}
            >
              Wrong number?
            </Text>
            <View>
              {resendLoading && <Spinner />}
              {resendButtonDisabledTime > 0
                ? !resendLoading && (
                    <Text style={styles.resendText}>
                      Resend otp in {resendButtonDisabledTime}
                    </Text>
                  )
                : !resendLoading && (
                    <Text
                      style={styles.resendText}
                      onPress={async () => {
                        setResendLoading(true);
                        let values = { phoneNumber };
                        await handleGetVerificationId(values);
                        setResendLoading(false);
                        RESEND_OTP_TIME_LIMIT = RESEND_OTP_TIME_LIMIT + 30;
                        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
                      }}
                    >
                      Resend otp
                    </Text>
                  )}
            </View>
          </View>
          {
            verifyingCode ? <Spinner/> : (
              <FormButton title={"SUBMIT"} color={Colors.secondary} />
            )
          }
          {<FormErrorMessage error={loginError} visible={true} />}
        </Form>
      )}
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  resendText: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
