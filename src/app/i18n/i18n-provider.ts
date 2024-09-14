import { APP_INITIALIZER, LOCALE_ID, PLATFORM_ID, Provider } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  defaultInterpolationFormat,
  I18NEXT_SERVICE,
  I18NextModule,
  I18NextTitle,
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
  detection: {
    // order and from where user language should be detected
    order: ['cookie'],

    // keys or params to lookup language from
    lookupCookie: 'lang',

    // cache user language on
    caches: ['cookie'],

    // optional expire and domain for set cookie
    cookieMinutes: 10080, // 7 days
    // cookieDomain: I18NEXT_LANG_COOKIE_DOMAIN
  }
};

export function appInit(i18next: ITranslationService, platformId: any) {
  return () => i18next.use(HttpApi).use(LanguageDetector).init(i18nextOptions);
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
    deps: [I18NEXT_SERVICE, PLATFORM_ID],
    useFactory: localeIdFactory
  },
  {
    provide: Title,
    useExisting: I18NextTitle
  }
];
