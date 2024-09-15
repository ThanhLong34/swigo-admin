import { createReducer, on } from '@ngrx/store';
import { changeLanguage } from './store/language/language.actions';

export interface AppState {
  language: string;
}

const initialState: AppState = {
  language: 'en',
};

export const appReducer = createReducer(initialState,
  on(changeLanguage, (state, { language }) => ({ ...state, language })),
);
