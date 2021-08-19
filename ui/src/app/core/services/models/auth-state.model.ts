export interface AuthState {
  isLoggedIn: boolean;
  user: any;
}

export const DEFAULT_AUTH_STATE: AuthState = {
  isLoggedIn: false,
  user: null,
}
