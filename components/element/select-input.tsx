import { useController, useFormContext } from 'react-hook-form';

import { useFormState } from '../form/form';
import { View } from '../themed';
import React from 'react';
import DropDown, { DropDownPropsInterface } from 'react-native-paper-dropdown';
import { HelperText, TextInput } from 'react-native-paper';

export interface ListType {
  label: string;
  value: string | number;
  [x: string]: any;
}

export interface SelectInputProps
  extends Omit<
    DropDownPropsInterface,
    'visible' | 'onDismiss' | 'showDropDown' | 'value' | 'setValue' | 'list'
  > {
  name: string;
  onAfterDetailChange?: (item: any) => void;
  onAfterChange?: (item: any) => void;
  disabled?: boolean;
  list: ListType[];
}

export interface CustomSelectInputProps
  extends Omit<SelectInputProps, 'list'> {}

export default function Select(props: SelectInputProps) {
  const [visible, setVisible] = React.useState<boolean>(false);
  const { name, label, list, disabled, ...rest } = props;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });
  const { editable } = useFormState();
  const _disabled = !editable || disabled;

  React.useEffect(() => {
    const item = list.find((item) => field.value === item.value);
    props.onAfterDetailChange?.(item);
  }, [field.value, list, props]);

  if (_disabled) {
    const item = list.find((_item) => field.value === _item.value);
    return (
      <View>
        <TextInput
          {...rest}
          label={label}
          disabled={_disabled}
          value={item?.label ?? ''}
        />
        <HelperText type="error" visible={!!fieldState.error?.message}>
          {fieldState.error?.message}
        </HelperText>
      </View>
    );
  }

  return (
    <View>
      <DropDown
        {...rest}
        label={label}
        list={list}
        onDismiss={() => setVisible(false)}
        visible={visible}
        showDropDown={() => setVisible(true)}
        value={field.value}
        setValue={(value) => field.onChange(value)}
      />
      <HelperText type="error" visible={!!fieldState.error?.message}>
        {fieldState.error?.message}
      </HelperText>
    </View>
  );
}
