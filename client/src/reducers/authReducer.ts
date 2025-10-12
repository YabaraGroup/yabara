import type { User } from '../types/User';

/** ---- Types du state et des actions ---- */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

/** ---- Types des actions ---- */
export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'CHECK_SESSION_SUCCESS'; payload: User }
  | { type: 'CHECK_SESSION_FAIL' }
  | { type: 'STOP_LOADING' };

/** ---- State initial ---- */
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

/** ---- Reducer ---- */
export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
    case 'CHECK_SESSION_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };

    case 'LOGOUT':
    case 'CHECK_SESSION_FAIL':
      return { ...state, user: null, isAuthenticated: false, loading: false };

    case 'STOP_LOADING':
      return { ...state, loading: false };

    default:
      return state;
  }
}
