import { ResourceType } from '@dashify/provider';
import { RowClick } from '../types';
import { useResourceRedirect } from '../../resources';

export const useRowClickHandler = ({ rowClick }: { rowClick?: RowClick }) => {
  const redirect = useResourceRedirect();

  const redirectToShow = <Resource extends ResourceType>(
    resource: Resource
  ) => {
    redirect({ id: resource?.id, view: 'show' });
  };

  const clickHandler =
    <Resource extends ResourceType>(resource: Resource) =>
    () => {
      if (rowClick === false) {
        return undefined;
      }
      return rowClick ? rowClick(resource) : redirectToShow(resource);
    };

  return clickHandler;
};
