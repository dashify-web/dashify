export type ResourceView = 'list' | 'show' | 'edit' | 'create';
export type AuthenticationStatus = 'UNKNOWN' | 'CONNECTED' | 'NOT_CONNECTED';
export type AuthErrorType =
  | 'ROLE_PERMISSION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'UNKNOWN_ERROR';

export type OnErrorType = (args: {
  errorType: AuthErrorType;
  isRequired: boolean;
  navigate: (path: string) => void;
}) => void;

export type AuthProviderBase<
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
> = {
  signin: (data: SigninData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  signout: () => Promise<void>;
  checkAuth: () => Promise<UserCredentials>;
  checkError: (error: any) => Promise<void>;
  onError: OnErrorType;
  getRole: never;
  compareRole: never;
};

export type AuthProviderWithRole<
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
  Role = any,
> = Omit<
  AuthProviderBase<UserCredentials, SigninData, SignupData>,
  'compareRole' | 'getRole'
> & {
  getRole: (data: UserCredentials) => Promise<Role>;
  compareRole: (args: {
    candidateRole: Role;
    requiredRole: Role;
  }) => Promise<void>;
};

export type AuthProvider<
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
  Role = any,
> =
  | AuthProviderBase<UserCredentials, SigninData, SignupData>
  | AuthProviderWithRole<UserCredentials, SigninData, SignupData, Role>;
