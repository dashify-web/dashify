import { List, TextCellField } from "@dashify/chakra"
import { EMPTY_VALUE } from "../../../config/typo"

export const CustomerList = () => {
  return (
    <List>
      <TextCellField label="Id" source="id" emptyValue={EMPTY_VALUE} />
      <TextCellField label="Email" source="email" emptyValue={EMPTY_VALUE} />
      <TextCellField label="Username" source="username" emptyValue={EMPTY_VALUE} />
      <TextCellField label="Username" source="username" emptyValue={EMPTY_VALUE} />
      <TextCellField label="Password" source="password" emptyValue={EMPTY_VALUE} />
    </List>
  )
}
