export type ResourceView = 'list' | 'show' | 'edit' | 'create';

export enum AuthenticationStatus {
  UNKNOWN, // still checking
  CONNECTED,
  NOT_CONNECTED,
}

export enum AuthErrorType {
  ROLE_PERMISSION_ERROR,
  AUTHENTICATION_ERROR,
  UNKNOWN_ERROR,
}

export type OnErrorType = (args: {
  erroType: AuthErrorType;
  isRequired: boolean;
}) => void;

export type AuthProviderBase<
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
> = {
  signin: (data: SigninData) => Promise<UserCredentials>;
  signup: (data: SignupData) => Promise<UserCredentials>;
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
  compareRole: (args: { candidateRole: Role; role: Role }) => Promise<void>;
};

export type AuthProvider<
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
  Role = any,
> =
  | AuthProviderBase<UserCredentials, SigninData, SignupData>
  | AuthProviderWithRole<UserCredentials, SigninData, SignupData, Role>;
