export type ResourceView = 'list' | 'show' | 'edit' | 'create';

export type AuthenticationStatus = 'CONNECTED' | 'UNKNOWN' | 'NOT_CONNECTED';
export type AuthenticationErrorType<AuthError = any> = {
  authError?: { error: AuthError };
  unknownError?: { data?: any; error: any };
};

export type AuthProviderBase = {
  signin: <Data = any, Response = any>(data: Data) => Promise<Response>;
  signup: <Data = any, Response = any>(data: Data) => Promise<Response>;
  signout: () => Promise<void>;
  checkAuth: <UserCredentials = any>() => Promise<UserCredentials>;
  checkError: (error: any) => Promise<void>;
  getRole: never;
  checkRole: never;
};

export type AuthProviderWithRole<Role = any> = Omit<
  AuthProviderBase,
  'checkRole' | 'getRole'
> & {
  getRole: <Data = any>(data: Data) => Promise<Role>;
  checkRole: <Role = any>(candidateRole: Role, payload: Role) => boolean; // TODO: maybe changed to promise
};

export type AuthProvider<Role = any> =
  | AuthProviderBase
  | AuthProviderWithRole<Role>;
