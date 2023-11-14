import * as React from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { FieldProps } from "../field";

import { useController, useFormContext } from "react-hook-form";
import Checkbox, { CheckboxProps } from "expo-checkbox";
import InputGroup from "../input-group";
import {
  SeparatorTypeEnum,
  styMargin,
} from "../../../constants/styles.constant";
import { Text } from "../../themed";
import colorConstant from "../../../constants/color.constant";

export interface CheckboxFieldProps extends FieldProps, CheckboxProps {
  type: "checkbox";
  label?: string;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onAfterChange?: (value: string) => void;
  disableErrorText?: boolean;
}

export default function CheckboxField(props: CheckboxFieldProps) {
  const { type, name, required, onAfterChange, label, ...restProps } = props;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });

  const onTriggerCheckbox = React.useCallback(() => {
    field.onChange(!field.value);
  }, [field.value]);

  return (
    <InputGroup error={fieldState.error} style={[styles.inputGroup]}>
      <Pressable onPress={onTriggerCheckbox} style={styles.checkboxContainer}>
        <Checkbox
          value={field.value}
          style={[styMargin(8, SeparatorTypeEnum.right), styles.checkbox]}
          onValueChange={onTriggerCheckbox}
          color={colorConstant.primaryOrange1}
        />
        <Text style={styles.labelText}>{label}</Text>
      </Pressable>
    </InputGroup>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  labelText: {
    color: colorConstant.gray2,
  },
  checkbox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
  },
});
