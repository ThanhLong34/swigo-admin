// angular import
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { LanguageSelectorComponent } from 'src/app/shared/language-selector/language-selector.component';

// primeNG import
import { MessageService } from 'primeng/api';
import { I18NextModule } from 'angular-i18next';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RouterModule, ReactiveFormsModule, CommonModule, LanguageSelectorComponent, I18NextModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss'],
})
export default class LoginComponent {
  loginType = [
    {
      image: 'assets/images/authentication/facebook.svg',
      alt: 'facebook',
      title: 'Sign In with Facebook'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      alt: 'twitter',
      title: 'Sign In with Twitter'
    },
    {
      image: 'assets/images/authentication/google.svg',
      alt: 'google',
      title: 'Sign In with Google'
    }
  ];
  formData!: FormGroup;

  constructor(private messageService: MessageService) {
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

  handleSubmit() {

  }

  handleShowToast(inputType: string) {
    if (inputType === 'email' && this.emailIsInvalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Email is invalid' });
    }
    if (inputType === 'password' && this.passwordIsInvalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Password is invalid' });
    }
  }
}
