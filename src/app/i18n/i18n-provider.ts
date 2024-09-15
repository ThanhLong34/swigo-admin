import { APP_INITIALIZER, LOCALE_ID, Provider } from '@angular/core';
import {
  defaultInterpolationFormat,
  I18NEXT_SERVICE,
  I18NextLoadResult,
  I18NextModule,
  ITranslationService
} from 'angular-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nextOptions = {
  supportedLngs: ['en', 'vi'],
  fallbackLng: 'en',
  debug: true,
  returnEmptyString: false,
  ns: ['translation', 'validation', 'error'],
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  },
  backend: {
    loadPath: 'assets/locales/{{lng}}/{{ns}}.json'
  },
};

export function appInit(i18next: ITranslationService) {
  return () => {
    const promise: Promise<I18NextLoadResult> = i18next
      .use(HttpApi)
      .use(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
];
