import { useNavigate } from 'react-router-dom';
import { ResourceType } from '@dashify/provider';
import { useResourceName } from './use-resource-name';

export type UseResourceRedirectArgs =
  | {
      resource?: string;
      view: 'list' | 'create';
      id?: never;
    }
  | (ResourceType & {
      resource?: string;
      view: 'show' | 'edit';
    });

export const useResourceRedirect = () => {
  const navigate = useNavigate();
  const resourceName = useResourceName();

  return ({ resource = resourceName, view, id }: UseResourceRedirectArgs) => {
    const basePath = `/${resource}`;
    const prefixPath =
      view !== 'list' && view !== 'create' ? `/${id}/${view}` : '';

    navigate(`${basePath}${prefixPath}`);
  };
};
