import { useController, useFormContext } from "react-hook-form";
import { Text } from "../themed";
import colorConstant from "../../constants/color.constant";
import { DatePicker, List } from "@ant-design/react-native";
import { DatePickerProps } from "@ant-design/react-native/lib/date-picker";
import { useFormState } from "../form/form";

interface Props extends DatePickerProps {
  name: string;
  label?: React.ReactNode | string;
  placeholder?: string;
}

export default function DateInput(props: Props) {
  const {
    name,
    label,
    format = "YYYY-MM-DD",
    disabled,
    placeholder = "Select Date",
    mode = "date",
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
    <>
      {!!label && typeof label === "string" ? (
        <Text
          style={{
            marginLeft: 16,
            fontSize: 14,
            marginBottom: 16,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      ) : (
        label
      )}
      <DatePicker
        {...rest}
        {...field}
        value={field.value}
        format={format}
        onChange={(value) => field.onChange(value)}
        disabled={_disabled}
        mode={mode}
      >
        <List.Item arrow="horizontal">
          {
            <Text
              style={{
                fontWeight: "600",
              }}
            >
              {placeholder}
            </Text>
          }
        </List.Item>
      </DatePicker>
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
