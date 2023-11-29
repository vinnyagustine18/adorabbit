import Select, {
  CustomSelectInputProps,
  ListType,
} from '../../../components/element/select-input';

import { useGetTypes } from '../../../api-hook/type/query';

export interface Props extends CustomSelectInputProps {}

export default function TypeSelectInput(props: Props) {
  const { disabled, label = 'Type', ...rest } = props;
  const query = useGetTypes();
  const data = query.data ?? [];

  const list: ListType[] = data.map((item) => {
    return {
      label: `${item.name}`,
      value: item.id,
      extra: item,
    };
  });

  const _disabled = disabled || query.isFetching;

  return (
    <Select
      {...rest}
      list={list}
      disabled={_disabled}
      label={label}
      addRoute="/type/create"
    />
  );
}
