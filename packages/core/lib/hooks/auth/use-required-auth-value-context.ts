import { useContext } from 'react';
import { REQUIRED_AUTH_VALUE_CONTEXT } from '../../context';

export const useRequiredAuthValueContext = () => {
  return useContext(REQUIRED_AUTH_VALUE_CONTEXT);
};
