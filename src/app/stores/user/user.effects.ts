import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { login, logout } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap(({ user, remember }) => {
        if (remember) {
          localStorage.setItem('userLogin', JSON.stringify(user));
        }
      }),
      map(() => ({ type: 'noop' })), // Prevent infinite loop
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('userLogin');
      }),
      map(() => ({ type: 'noop' })), // Prevent infinite
    ),
  );
}
