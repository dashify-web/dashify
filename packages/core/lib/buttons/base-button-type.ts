import { MouseEventHandler, PropsWithChildren, RefAttributes } from 'react';
import { AnyRefElement } from '../utils/types-tools';

export type BaseButtonProps<RefElementType extends AnyRefElement> =
  PropsWithChildren<
    {
      onClick?: MouseEventHandler<RefElementType>;
    } & RefAttributes<RefElementType>
  >;
