import { createReducer, on } from '@ngrx/store';
import { changeLanguage } from './stores/language/language.actions';
import { login, logout } from './stores/user/user.actions';
import { User } from './types/user.type';

export interface AppState {
  language: string;
  user: User | null;
}

const initialState: AppState = {
  language: 'en',
  user: null,
};

export const appReducer = createReducer(initialState,
  on(changeLanguage, (state, { language }) => ({ ...state, language })),
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null })),
);
