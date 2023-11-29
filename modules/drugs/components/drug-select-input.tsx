import { useGetDrugs } from '../../../api-hook/drug/query';
import Select, {
  CustomSelectInputProps,
  ListType,
} from '../../../components/element/select-input';

export interface Props extends CustomSelectInputProps {}

export default function DrugSelectInput(props: Props) {
  const { disabled, label = 'Drug', ...rest } = props;
  const query = useGetDrugs();
  const data = query.data ?? [];

  const list: ListType[] = data.map((item) => {
    return {
      label: `${item.type} - ${item.dose}`,
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
      addRoute="/drug/create"
    />
  );
}
