import InputItem, {
  InputItemProps,
} from "@ant-design/react-native/lib/input-item";
import { useController, useFormContext } from "react-hook-form";
import { useFormState } from "../form";

import colorConstant from "../../constants/color.constant";
import { Text } from "../themed";

export interface TextInputProps extends InputItemProps {
  name: string;
  label?: React.ReactNode | string;
}

export default function TextInput(props: TextInputProps) {
  const { name, disabled, label, ...rest } = props;
  const { control, setValue } = useFormContext();
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
          }}
        >
          {label}
        </Text>
      ) : (
        label
      )}
      <InputItem
        {...field}
        value={field.value}
        onChange={(value) =>
          setValue(name, value, { shouldValidate: true, shouldTouch: true })
        }
        {...rest}
        disabled={_disabled}
        error={!!fieldState.error?.message}
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
