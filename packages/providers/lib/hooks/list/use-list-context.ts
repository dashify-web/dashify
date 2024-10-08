import { useContext } from 'react';
import { LIST_CONTEXT, ListContextType } from '../../context';
import { ResourceType } from '../../types';

export const useListContext = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>() => {
  const response = useContext(LIST_CONTEXT);

  if (response === null) {
    throw new Error('useListContext must be wrapped by ListContext');
  }

  return response as ListContextType<T, Meta, Params, Error>;
};
