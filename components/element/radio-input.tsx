import { useController, useFormContext } from "react-hook-form";
import { useFormState } from "../form/form";

import React from "react";
import { Text, View } from "../themed";
import {
  RadioButton,
  RadioButtonGroupProps,
  RadioButtonProps,
} from "react-native-paper";

export interface RadioOptionType extends RadioButtonProps {
  label: string;
  [x: string]: any;
}
export interface RadioInputProps
  extends Omit<RadioButtonGroupProps, "onValueChange" | "value" | "children"> {
  name: string;
  options: RadioOptionType[];
  label?: React.ReactNode | string;
  disabled?: boolean;
}

export default function RadioInput(props: RadioInputProps) {
  const { name, disabled = false, label, options = [], ...rest } = props;
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  const { editable } = useFormState();
  const _disabled = !editable || disabled;

  return (
    <View>
      {typeof label === "string" ? <Text>{label}</Text> : label}
      <RadioButton.Group
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
      >
        {options.map((option) => {
          return (
            <View
              key={option.value}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                {...option}
                disabled={_disabled || option.disabled}
              />
              <Text>{option.label}</Text>
            </View>
          );
        })}
      </RadioButton.Group>
    </View>
  );
}
