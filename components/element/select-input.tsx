import { useController, useFormContext } from "react-hook-form";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";
import { useFormState } from "../form";
import { Text } from "../themed";
import colorConstant from "../../constants/color.constant";
import React from "react";

export interface SelectInputProps
  extends Omit<PickerSelectProps, "onValueChange"> {
  name: string;
  label?: React.ReactNode | string;
  onAfterDetailChange?: (item: any) => void;
  onAfterChange?: (item: any) => void;
}

export default function Select(props: SelectInputProps) {
  const {
    name,
    label,
    disabled,
    items,
    useNativeAndroidPickerStyle = true,
    ...rest
  } = props;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { editable } = useFormState();
  const _disabled = !editable || disabled;

  React.useEffect(() => {
    const item = items.find((item) => field.value === item.value);
    props.onAfterDetailChange?.(item);
  }, [field.value, items]);

  return (
    <>
      {!!label && typeof label === "string" ? (
        <Text
          style={{
            marginLeft: 16,
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      ) : (
        label
      )}
      <RNPickerSelect
        {...rest}
        items={items}
        useNativeAndroidPickerStyle={useNativeAndroidPickerStyle}
        value={field.value}
        onValueChange={(value, index) => {
          const item = items[index];
          props.onAfterChange?.(item);
        }}
        disabled={_disabled}
      />
      {!!fieldState.error?.message && (
        <Text
          style={{
            color: colorConstant.redDefault,
            fontSize: 11,
            fontWeight: "200",
            marginLeft: 16,
          }}
        >
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
}
