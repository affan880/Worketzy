import { useFormikContext } from "formik";
import React from "react";
import AppButton from "../CustomComponents/appButton";

export default function FormButton({ title, width }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} width={width} />;
}
