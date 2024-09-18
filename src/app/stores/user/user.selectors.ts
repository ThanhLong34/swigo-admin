import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

export const selectIsLoggedIn = createSelector(
  (state: AppState) => state.user,
  (user) => user && !!user.id
);

export const selectUserLogin = createSelector(
  (state: AppState) => state.user,
  (user) => user
);
