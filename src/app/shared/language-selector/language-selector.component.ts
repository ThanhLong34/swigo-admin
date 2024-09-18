import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { changeLanguage } from 'src/app/stores/language/language.actions';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'language-selector'
  }
})
export class LanguageSelectorComponent implements OnInit {
  languages = [
    { name: 'English', code: 'en', image: 'assets/images/languages/united-kingdom.png' },
    { name: 'Tiếng Việt', code: 'vi', image: 'assets/images/languages/vietnam.png' },
  ]
  selectedLanguage = this.languages[0];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const languageCodeSaved = localStorage.getItem('language');
    const language = this.languages.find(lang => lang.code === languageCodeSaved)
    this.selectedLanguage = language || this.languages[0];
  }

  handleChangeLanguage() {
    const lang = this.selectedLanguage.code
    this.store.dispatch(changeLanguage({ language: lang }));
  }
}
