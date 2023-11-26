import { useController, useFormContext } from "react-hook-form";
import { useFormState } from "../form/form";
import { Text } from "../themed";
import colorConstant from "../../constants/color.constant";
import { TextareaItem } from "@ant-design/react-native";
import { TextareaItemProps } from "@ant-design/react-native/lib/textarea-item";

interface Props extends TextareaItemProps {
  name: string;
  label?: React.ReactNode | string;
}

export default function TextAreaInput(props: Props) {
  const { name, label, disabled, rows = 4, ...rest } = props;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
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
            fontWeight: "600",
            marginBottom: 16,
          }}
        >
          {label}
        </Text>
      ) : (
        label
      )}
      <TextareaItem
        {...rest}
        {...field}
        rows={rows}
        disabled={_disabled}
        style={
          rest.style ?? {
            marginLeft: 8,
          }
        }
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
