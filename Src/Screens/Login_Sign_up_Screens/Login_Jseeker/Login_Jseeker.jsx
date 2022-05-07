import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseLogin, getVerificationId } from '../../../Components/firebase/firebase';
import firebaseConfig from '../../../Components/firebase/firebaseConfig';
import Form from '../../../Components/forms/form';
import FormErrorMessage from '../../../Components/forms/formErrorMessage';
import FormButton from '../../../Components/forms/formButton';
import FormField from '../../../Components/forms/formField';
import SafeView from '../../../Components/safeView'; 
import Spinner from '../../../Components/spinner';
import Colors from '../../../utils/Colors'
import { validationSchemaPhone, validationSchemaCode } from '../../../Validation/InputValidation';

let RESEND_OTP_TIME_LIMIT = 30;
let resendOtpTimerInterval;


export default function LoginScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [loginError, setLoginError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [codeError, setCodeError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
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
    const { phoneNumber } = values;
    const recaptchaVerifierCurrent = recaptchaVerifier.current;
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
  }

  async function handleLogin(values) {
    const { verificationCode } = values;
    try {
      await firebaseLogin({ verificationCode, verificationId });
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      {!verificationId && (
        <Form
          initialValues={{ phoneNumber: "" }}
          validationSchema={validationSchemaPhone}
          onSubmit={async (values) => await handleGetVerificationId(values)}
        >
          <FormField
            name="phoneNumber"
            leftIcon="phone"
            placeholder="Enter phone number"
            autoCapitalize="none"
            keyboardType="phone-pad"
            autoFocus={true}
          />
          <FormButton title={"send code"} />
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

          <FormButton title={"login"} />
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
