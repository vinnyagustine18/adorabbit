import { useController, useFormContext } from 'react-hook-form';
import { Checkbox, CheckboxItemProps, HelperText } from 'react-native-paper';
import { useFormState } from '../form/form';
import { View } from '../themed';

export interface CheckboxInputProps
  extends Omit<CheckboxItemProps, 'status' | 'onPress'> {
  name: string;
}

export default function CheckboxInput(props: CheckboxInputProps) {
  const { name, disabled, ...rest } = props;
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({
    name,
    control,
  });

  const { editable } = useFormState();
  const _disabled = !editable || disabled;
  return (
    <View>
      <Checkbox.Item
        {...rest}
        status={field.value ? 'checked' : 'unchecked'}
        onPress={() => {
          field.onChange(!field.value);
        }}
        disabled={_disabled}
      />
      <HelperText type="error" visible={!!fieldState.error?.message}>
        {fieldState.error?.message}
      </HelperText>
    </View>
  );
}
