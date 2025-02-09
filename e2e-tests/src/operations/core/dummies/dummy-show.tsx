import { useParams } from 'react-router-dom';
import { useGetById } from '@dashify/provider';
import { Dummy } from '../../../types';

export const DummyShow = () => {
  const { id } = useParams();
  const {
    data: dummy,
    isLoading,
    isError,
  } = useGetById<Dummy>({ resource: 'dummies', id: id ?? '' });

  if (isError) {
    return <p>request-error</p>;
  }

  return <p>{isLoading ? 'request-loading' : dummy?.name}</p>;
};
