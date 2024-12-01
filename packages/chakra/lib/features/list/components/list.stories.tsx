import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List } from './list';
import { TextCellField } from './text-cell-field';
import { FunctionCellField } from './function-cell-field';
import {
  ProviderContext,
  BrowserRouterProvider,
  ChakraProvider,
} from '../../../utils/stories-provider';

const meta: Meta<typeof List> = {
  component: List,
  render: () => (
    <ChakraProvider>
      <BrowserRouterProvider>
        <ProviderContext>
          <List
            defaultPagination={{ page: 1, pageSize: 2 }}
            rowClick={false}
            resource="dummies"
          >
            <FunctionCellField
              label="Id"
              render={(dummy) => `Your Id: ${dummy.id}`}
            />
            <TextCellField
              label="Name"
              source="name"
              emptyValue="Not Defined"
            />
            <TextCellField
              label="Email"
              source="email"
              emptyValue="Not Defined"
            />
          </List>
        </ProviderContext>
      </BrowserRouterProvider>
    </ChakraProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {};
