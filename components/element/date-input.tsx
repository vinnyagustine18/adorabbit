import { useController, useFormContext } from "react-hook-form";
import { Text, View } from "../themed";
import colorConstant from "../../constants/color.constant";

import { useFormState } from "../form/form";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import { HelperText } from "react-native-paper";

interface Props
  extends Omit<
    DatePickerInputProps,
    "value" | "onChange" | "inputMode" | "locale"
  > {
  name: string;
  inputMode?: DatePickerInputProps["inputMode"];
  locale?: DatePickerInputProps["locale"];
}

export default function DateInput(props: Props) {
  const {
    name,
    label,
    disabled,
    placeholder = "Select Date",
    locale = "en",
    inputMode = "start",
    ...rest
  } = props;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const { editable } = useFormState();
  const _disabled = !editable || disabled;

  return (
    <View>
      <DatePickerInput
        {...rest}
        {...field}
        inputMode={inputMode}
        locale={locale}
        value={field.value}
        onChange={(value) => field.onChange(value)}
        disabled={_disabled}
      />
      <HelperText type="error" visible={!!fieldState.error?.message}>
        {fieldState.error?.message}
      </HelperText>
    </View>
  );
}
