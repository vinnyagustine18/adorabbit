import Select, {
  CustomSelectInputProps,
  ListType,
} from '../../../components/element/select-input';

import { useGetRabbits } from '../../../api-hook/rabbit/query';
import { GenderEnum } from '../../../api-hook/user/model';

export interface Props extends CustomSelectInputProps {
  gender?: 'both' | GenderEnum;
}

export default function RabbitSelectInput(props: Props) {
  const { disabled, gender = 'both', ...rest } = props;
  const query = useGetRabbits();
  const data = query.data ?? [];

  const list: ListType[] = data
    .map((item) => {
      return {
        label: `${item.name} - ${item.type.name} - ${item.gender}`,
        value: item.id,
        extra: item,
      };
    })
    .filter((item) => gender === 'both' || item.extra.gender === gender);

  const _disabled = disabled || query.isFetching;

  return (
    <Select
      list={list}
      disabled={_disabled}
      {...rest}
      addRoute="/rabbit/create"
    />
  );
}
