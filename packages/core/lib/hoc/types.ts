import { ComponentType } from 'react';
export type HocComponentType<ComponentProps, AddedProps> = ComponentType<
  Omit<ComponentProps, keyof AddedProps>
>;
