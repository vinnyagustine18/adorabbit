import * as React from "react";
import CheckboxField, {
  CheckboxFieldProps,
} from "./field-component/checkbox-field";
import SubmitField, { SubmitFieldProps } from "./field-component/submit-field";

import TextField, { CustomTextInputProps } from "./field-component/text-field";

export type FieldType =
  | "normal"
  | "phone"
  | "password"
  | "select"
  | "checkbox"
  | "submit";

export interface FieldProps {
  type: FieldType;
  name: string;
}

export type CombinedFieldProps =
  | CustomTextInputProps
  | CheckboxFieldProps
  | SubmitFieldProps;

export default function Field(props: CombinedFieldProps) {
  switch (props.type) {
    case "checkbox":
      return <CheckboxField {...props} />;
    case "submit":
      return <SubmitField {...props} />;
    default:
      return <TextField {...props} />;
  }
}
