import { useContext } from 'react';
import { ResourceType } from '@dashify/providers';
import { undefinedContextMessage } from '@dashify/utils';
import { LIST_CONTEXT, ListContextType } from '../../context';

export const useListContext = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>() => {
  const response = useContext(LIST_CONTEXT);

  if (response === null) {
    throw new Error(undefinedContextMessage('useListContext', 'ListContext'));
  }

  return response as ListContextType<T, Meta, Params, Error>;
};
