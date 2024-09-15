// angular import
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { LanguageSelectorComponent } from 'src/app/shared/language-selector/language-selector.component';

// primeNG import
import { MessageService } from 'primeng/api';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import { I18NextNamespacePipe } from 'src/app/pipes/i18next-namespace.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RouterModule, ReactiveFormsModule, CommonModule, LanguageSelectorComponent, I18NextModule, I18NextNamespacePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss']
})
export default class LoginComponent {
  loginType = [
    {
      image: 'assets/images/authentication/facebook.svg',
      alt: 'facebook',
      title: this.i18NextService.t('sign_in_with_facebook', {})
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      alt: 'twitter',
      title: this.i18NextService.t('sign_in_with_twitter')
    },
    {
      image: 'assets/images/authentication/google.svg',
      alt: 'google',
      title: this.i18NextService.t('sign_in_with_google')
    }
  ];
  formData!: FormGroup;

  constructor(
    private messageService: MessageService,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      remember: new FormControl(false)
    });
  }

  get emailIsInvalid() {
    const emailCtrl = this.formData.controls['email'];
    return emailCtrl.touched && emailCtrl.dirty && emailCtrl.invalid;
  }

  get passwordIsInvalid() {
    const passwordCtrl = this.formData.controls['password'];
    return passwordCtrl.touched && passwordCtrl.dirty && passwordCtrl.invalid;
  }

  handleSubmit() {}

  handleShowToast(inputType: string) {
    if (inputType === 'email' && this.emailIsInvalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Email is invalid' });
    }
    if (inputType === 'password' && this.passwordIsInvalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Password is invalid' });
    }
  }
}
