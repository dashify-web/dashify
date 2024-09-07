import { Customer } from './types';
import { ListContext, useListContext, usePagination } from '@dashify/core';

export const CustomerList = () => {
  return (
    <ListContext resource="customers" pagination={{ page: 1, pageSize: 2 }}>
      <CustomerListContent />
    </ListContext>
  );
};

const CustomerListContent = () => {
  const { pagination, doNextPage, doPrevPage } = usePagination();
  const { data: customers = [] } = useListContext<Customer>();

  return (
    <div>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            username: {customer.username}, email: {customer.email}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button data-testid="prev-button" onClick={doPrevPage}>
          next
        </button>
        <p data-testid="page-value">{pagination?.page}</p>
        <button data-testid="next-button" onClick={doNextPage}>
          next
        </button>
      </div>
    </div>
  );
};
