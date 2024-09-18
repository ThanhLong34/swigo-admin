import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { changeLanguage } from './language.actions';

@Injectable()
export class LanguageEffects {
  constructor(private actions$: Actions, @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {}

  loadLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeLanguage),
      tap(({ language }) => {
        this.i18NextService.changeLanguage(language).then(() => {
          localStorage.setItem('language', language);
          document.location.reload();
        });
      }),
      map(() => ({ type: 'noop' })), // Prevent infinite loop
    ),
  );
}
