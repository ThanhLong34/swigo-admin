import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

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
export class LanguageSelectorComponent {
  languages = [
    { name: 'English', code: 'en', image: 'assets/images/languages/united-kingdom.png' },
    { name: 'Tiếng Việt', code: 'vi', image: 'assets/images/languages/vietnam.png' },
  ]
  selectedLanguage = this.languages[0];

  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {}

  handleChangeLanguage() {
    this.i18NextService.changeLanguage(this.selectedLanguage.code);
  }
}
