import Select, {
  CustomSelectInputProps,
  ListType,
} from '../../../components/element/select-input';

import { useGetMates } from '../../../api-hook/mate/query';

export interface Props extends CustomSelectInputProps {}

export default function MateSelectInput(props: Props) {
  const { disabled, label = 'Mate', ...rest } = props;
  const query = useGetMates();
  const data = query.data ?? [];

  const list: ListType[] = data.map((item) => {
    return {
      label: [item.maleRabbit.name, item.femaleRabbit.name].join(' - '),
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
      addRoute="/mate/create"
    />
  );
}
