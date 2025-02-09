import { FunctionCellField, List, TextCellField } from '@dashify/chakra';
import { EMPTY_VALUE, renderMoney } from '../../../config/typo';

export const AdminList = () => {
  return (
    <List defaultPagination={{ page: 1, pageSize: 2 }}>
      <TextCellField label="Id" source="id" emptyValue={EMPTY_VALUE} />
      <TextCellField label="Email" source="email" emptyValue={EMPTY_VALUE} />
      <FunctionCellField
        label="Salary"
        render={(data) => renderMoney((data as any).salary.toString())}
      />
      <TextCellField
        label="Username"
        source="username"
        emptyValue={EMPTY_VALUE}
      />
      <TextCellField
        label="Username"
        source="username"
        emptyValue={EMPTY_VALUE}
      />
      <TextCellField
        label="Password"
        source="password"
        emptyValue={EMPTY_VALUE}
      />
      <TextCellField label="Role" source="role" emptyValue={EMPTY_VALUE} />
    </List>
  );
};
