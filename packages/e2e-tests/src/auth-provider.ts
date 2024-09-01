import { AuthErrorType, AuthProvider } from "@dashify/core";
import { UserDetails, SignupData, SigninData, Role, Admin, Customer } from "./types"
import { ADMIN_MOCKS, CUSTOMER_MOCKS } from "./users";

const verifyUsernameAndPassword = ({ password, username }: { username: string; password: string }) => {
  const customer = CUSTOMER_MOCKS.find(customer => customer.username === username && customer.password === password);
  const admin = ADMIN_MOCKS.find(admin => admin.username === username && admin.password === password);

  if (!customer && !admin) {
    return Promise.reject(new Error("(Signin | Signup) Failed"));
  }

  return Promise.resolve();
}

const TOKEN_SEPARATOR = "--";
const getUserByToken = (token: string): Promise<Customer | Admin> => {
  if (!token.includes(TOKEN_SEPARATOR)) {
    return Promise.reject({ status: 404, message: "wrong token" }); // for not signout, so let's just use 404
  }

  const customer = CUSTOMER_MOCKS.find(customer => customer.username === token.split(TOKEN_SEPARATOR)[0] && customer.password === token.split(TOKEN_SEPARATOR)[1]);
  const admin = ADMIN_MOCKS.find(admin => admin.username === token.split(TOKEN_SEPARATOR)[0] && admin.password === token.split(TOKEN_SEPARATOR)[1]);

  if (!customer && !admin) {
    return Promise.reject({ status: 403, message: "Forbidden" });
  }

  return Promise.resolve(admin! ?? customer!);
}

export const TOKEN_CACHE_NAME = "token";
export const authProvider: AuthProvider<UserDetails, SigninData, SignupData, Role> = {
  signin: async (signinData) => {
    return verifyUsernameAndPassword(signinData).then(() => {
      localStorage.setItem(TOKEN_CACHE_NAME, signinData.password + "--" + signinData.username);
    });
  },
  signup: async (signupData) => {
    return verifyUsernameAndPassword(signupData).then(() => {
      localStorage.setItem(TOKEN_CACHE_NAME, signupData.password + "--" + signupData.username);
    });
  },
  checkAuth: async () => {
    const token = localStorage.getItem(TOKEN_CACHE_NAME) || "";
    return getUserByToken(token).then((user) => ({
      id: user.id,
      role: "salary" in user ? Role.ADMIN : Role.CUSTOMER,
    }));
  },
  checkError: ({ status }: { status: number }) => {
    if (status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  onError: ({ erroType, isRequired }) => {
    if (erroType === AuthErrorType.AUTHENTICATION_ERROR && isRequired) {
      return window.location.href = "/login";
    }
    alert("Error");
  },
  signout: () => Promise.resolve(localStorage.setItem(TOKEN_CACHE_NAME, "")),
  getRole: (useDetails) => {
    return Promise.resolve(useDetails.role);
  },
  compareRole: ({ role, candidateRole }) => {
    if (role === candidateRole) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
}
