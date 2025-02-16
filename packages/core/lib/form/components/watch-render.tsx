import { ReactNode } from 'react';
import { FieldPath, useFormContext, useWatch } from 'react-hook-form';

export type WatchRenderProps<FieldValues extends object> = {
  sources: FieldPath<FieldValues>[];
  render: (values: FieldValues) => ReactNode;
};

export const WatchRender = <FieldValues extends object>({
  sources,
  render,
}: WatchRenderProps<FieldValues>) => {
  const { getValues } = useFormContext<FieldValues>();
  useWatch<FieldValues>({ name: sources });

  return render(getValues());
};
