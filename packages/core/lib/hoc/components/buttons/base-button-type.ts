import { MouseEventHandler, PropsWithChildren, RefAttributes } from 'react';
import { AnyRefElement } from '../../types';

export type BaseButtonProps<RefElementType extends AnyRefElement> =
  PropsWithChildren<
    {
      onClick?: MouseEventHandler<RefElementType>;
    } & RefAttributes<RefElementType>
  >;
