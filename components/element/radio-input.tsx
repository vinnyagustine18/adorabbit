import { Flex, Radio, WingBlank } from "@ant-design/react-native";
import { RadioProps } from "@ant-design/react-native/lib/radio/Radio";
import { RadioGroupProps } from "@ant-design/react-native/lib/radio/RadioGroup";
import { useController, useFormContext } from "react-hook-form";
import { useFormState } from "../form";
import { RadioOptionType } from "@ant-design/react-native/lib/radio/PropsType";
import React from "react";

export interface RadioInputProps extends Omit<RadioGroupProps, "options"> {
  name: string;
  options: RadioOptionType[];
}

export default function RadioInput(props: RadioInputProps) {
  const { name, disabled, options = [], ...rest } = props;
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  const { editable } = useFormState();
  const _disabled = !editable || disabled;

  return (
    <Radio.Group
      {...rest}
      disabled={_disabled}
      value={field.value}
      defaultValue={field.value}
      onChange={(e) => field.onChange(e.target.value)}
    >
      <Flex
        style={{
          marginLeft: 14,
        }}
      >
        {options.map((option) => {
          return (
            <React.Fragment key={option.value}>
              <Radio {...option}>{option.label}</Radio>
              <WingBlank />
            </React.Fragment>
          );
        })}
      </Flex>
    </Radio.Group>
  );
}
