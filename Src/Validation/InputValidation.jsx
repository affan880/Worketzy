import * as Yup from "yup";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/g;

export const validationSchemaPhone = Yup.object().shape({
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export const validationSchemaCode = Yup.object().shape({
  verificationCode: Yup.number(),
});

export const validationSchemaUserDetails = Yup.object().shape({
  ValidFirstName: Yup.string().trim().min(3, 'First name is too short').required('name is required'),
  ValidLastName: Yup.string().trim().min(3, 'Last name is too short').required('name is required'),
  ValidEmail: Yup.string().email('Enter valid Email').required('email is required')
});