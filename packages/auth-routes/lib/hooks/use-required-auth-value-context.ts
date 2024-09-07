import { useContext } from 'react';
import { REQUIRED_AUTH_VALUE_CONTEXT } from '../context';

export const useRequiredAuthValueContext = () => {
  const requiredAuthValueContext = useContext(REQUIRED_AUTH_VALUE_CONTEXT);

  if (requiredAuthValueContext === null) {
    throw new Error(
      'useRequiredAuthValueContext must be wrapped by RequiredAuthValueContext'
    );
  }

  return requiredAuthValueContext;
};
