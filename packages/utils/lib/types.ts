import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

export type StateSetter<T> = Dispatch<SetStateAction<T>>;
export type Nullable<T> = T | null;
export type NativeStyle = HTMLAttributes<HTMLElement>['style'];
