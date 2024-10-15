import { useNavigate } from 'react-router-dom';
import { RequiredResourceName, ResourceType } from '@dashify/provider';

export type UseResourceRedirectArgs =
  | (RequiredResourceName & {
      view: 'list' | 'create';
      id?: never;
    })
  | (ResourceType &
      RequiredResourceName & {
        view: 'show' | 'edit';
      });

export const useResourceRedirect = () => {
  const navigate = useNavigate();
  return ({ resource, view, id }: UseResourceRedirectArgs) => {
    const basePath = `/${resource}`;
    const prefixPath =
      view !== 'list' && view !== 'create' ? `/${id}/${view}` : '';

    navigate(`${basePath}${prefixPath}`);
  };
};
