import { useContext } from 'react';
import { REQUIRED_AUTH_VALUE_CONTEXT } from '../context';
import { undefinedContextMessage } from '@dashify/utils';

export const useRequiredAuthValueContext = () => {
  const requiredAuthValueContext = useContext(REQUIRED_AUTH_VALUE_CONTEXT);

  if (requiredAuthValueContext === null) {
    throw new Error(
      undefinedContextMessage(
        'useRequiredAuthValueContext',
        'RequiredAuthValueContext'
      )
    );
  }

  return requiredAuthValueContext;
};
