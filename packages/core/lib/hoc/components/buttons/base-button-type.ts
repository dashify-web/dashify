import { MouseEvent, PropsWithChildren } from 'react';

export type BaseButtonProps = PropsWithChildren<{
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>;
