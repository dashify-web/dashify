export type ResourceView = 'list' | 'show' | 'edit' | 'create';

export type CommonFieldProps = {
  source: string;
  label?: string;
  emptyValue?: string;
}
