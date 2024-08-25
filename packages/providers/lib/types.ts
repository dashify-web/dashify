export type ResourceType = { id: string | number };

export type Pagination = {
  page?: number;
  pageSize?: number;
};

export type Sort = {
  order?: 'ASC' | 'DESC';
  orderBy?: string;
};

export type Query<Meta, Params> = {
  meta?: Meta;
  params?: Params;
};

export type RequiredResourceName = {
  resource: string;
};

export type GetListsArgsType<Meta = any, Params = any> = Query<Meta, Params> & {
  sorts?: Sort[];
  pagination?: Pagination;
};
export type GetByIdArgsType<Meta = any, Params = any> = Query<Meta, Params> &
  Pick<ResourceType, 'id'>;
export type CreateArgsType<Payload = any, Meta = any, Params = any> = Query<
  Meta,
  Params
> & { payload: Payload };
export type EditArgsType<Payload = any, Meta = any, Params = any> = Query<
  Meta,
  Params
> & {
  payload: Payload;
};
export type DeleteArgsType<Payload = any, Meta = any, Params = any> = Query<
  Meta,
  Params
> & {
  payload: Payload;
};

export type Provider<T extends ResourceType> = RequiredResourceName & {
  getList: <Meta = any, Params = any>(
    args: GetListsArgsType<Meta, Params>
  ) => Promise<T[]>;
  getById: <Meta = any, Params = any>(
    args: GetByIdArgsType<Meta, Params>
  ) => Promise<T>;
  create: <Meta = any, Params = any>(
    args: CreateArgsType<T, Meta, Params>
  ) => Promise<T>;
  edit: <Meta = any, Params = any>(
    args: CreateArgsType<T, Meta, Params>
  ) => Promise<T>;
  delete: <Meta = any, Params = any>(
    args: DeleteArgsType<T, Meta, Params>
  ) => Promise<T>;
};

export type FacadeProvider = {
  readonly providers: Provider<any>[];
  readonly getProvider: <T extends ResourceType>({
    resource,
  }: RequiredResourceName) => Provider<T>;
};
