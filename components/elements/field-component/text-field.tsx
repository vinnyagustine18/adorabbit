import * as React from "react";
import { StyleProp, ViewStyle, TextInputProps, StyleSheet } from "react-native";
import { FieldProps } from "../field";

import { useController, useFormContext } from "react-hook-form";
import TextInput from "../text-input";
import InputGroup from "../input-group";

export interface CustomTextInputProps extends FieldProps, TextInputProps {
  type: "normal" | "phone" | "password";
  label?: string;
  dialCode?: string;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  onAfterChange?: (value: string) => void;
  rightIconOnPress?: () => void;
  leftIconComponent?: (iconSize: any, iconColor: any) => React.ReactNode;
  rightIconComponent?: (iconSize: any, iconColor: any) => React.ReactNode;
  customRightIconComponent?: () => React.ReactNode;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  noMarginBottom?: boolean;
  disableErrorText?: boolean;
  disabled?: boolean;
}

export default function TextField(props: CustomTextInputProps) {
  const {
    type,
    dialCode = "",
    name,
    required,
    onAfterChange,
    rightIconOnPress,
    noMarginBottom,
    ...restProps
  } = props;
  const { control } = useFormContext();
  const { field, fieldState, formState } = useController({
    name,
    control,
  });

  let content: React.ReactNode = null;

  // const formatNumber = React.useCallback((value: string) => {
  //   if (!value) {
  //     return "0";
  //   }
  //   if (value[0] !== ".") {
  //     const checkDot = value?.indexOf(".");
  //     if (checkDot > 0) {
  //       const subString = value.substring(0, checkDot);
  //       const endString = value
  //         .substring(checkDot + 1, value.length)
  //         .replace(regexUtils.dotRegex.global, "");

  //       return subString + "." + endString;
  //     } else if (value[0] === "0" && value.length === 1) {
  //       return "0";
  //     } else if (value[0] === "0") {
  //       return value[1];
  //     } else {
  //       return value;
  //     }
  //   } else {
  //     return "";
  //   }
  // }, []);

  const _onChange = React.useCallback(
    (value: string) => {
      switch (type) {
        case "phone":
          const prefix = dialCode;
          let maskedText = value.replace(/(\D|^0)/g, "");
          if (maskedText.length <= prefix.length) {
            maskedText = prefix;
          }
          if (!maskedText.startsWith(prefix)) {
            maskedText = prefix.concat(maskedText);
          }
          const phoneValue = `${prefix ? "+" : ""}${maskedText}`;
          field.onChange(phoneValue);
          onAfterChange && onAfterChange(phoneValue);
          break;

        // case "currency":
        //   if (value === undefined) {
        //     return;
        //   }
        //   const currencyValue = formatNumber(
        //     value.replace(regexUtils.currencyRegex.global, "")
        //   );
        //   if (currencyValue !== fields.value) {
        //     // setNumber(currencyValue);
        //     helpers.setValue(currencyValue);
        //     onAfterChange && onAfterChange(currencyValue);
        //   }
        //   break;
        default:
          field.onChange(value);
          onAfterChange && onAfterChange(value);
          break;
      }
    },
    [dialCode, field, onAfterChange, type]
  );

  const onBlur = React.useCallback(() => {
    field.onBlur();
  }, [field]);

  switch (type) {
    case "normal":
    case "password":
      const {
        onChange: normalOnChange,
        onBlur: normalOnBlur,
        ...normalRestFields
      } = field;
      content = (
        <TextInput
          isError={!!(fieldState.isTouched && fieldState.error)}
          onBlur={onBlur}
          onChangeText={_onChange}
          type={type}
          rightIconOnPress={rightIconOnPress}
          {...normalRestFields}
          {...restProps}
        />
      );
      break;
    // case "currency":
    //   const {
    //     onChange: currencyOnChange,
    //     onBlur: currencyOnBlur,
    //     ...currencyRestFields
    //   } = fields;
    //   content = (
    //     <TextInput
    //       isError={!!(meta.touched && meta.error)}
    //       onBlur={onBlur}
    //       onChangeText={_onChange}
    //       type={type}
    //       rightIconOnPress={rightIconOnPress}
    //       {...normalRestFields}
    //       {...restProps}
    //       value={fields.value}
    //     />
    //   );
    //   break;

    case "phone":
      const {
        onChange: phoneOnChange,
        onBlur: phoneOnBlur,
        ...phoneRestFields
      } = field;
      content = (
        <TextInput
          isError={!!(fieldState.isTouched && fieldState.error)}
          keyboardType="numeric"
          onBlur={onBlur}
          required={required}
          {...phoneRestFields}
          {...restProps}
          onChangeText={_onChange}
          rightIconOnPress={rightIconOnPress}
        />
      );
      break;
  }

  return (
    <InputGroup
      error={fieldState.error}
      style={[styles.inputGroup, noMarginBottom && styles.zeroMargin]}
    >
      {content}
    </InputGroup>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  zeroMargin: {
    marginBottom: 0,
  },
});
