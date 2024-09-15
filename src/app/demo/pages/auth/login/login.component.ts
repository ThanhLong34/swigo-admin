// angular import
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { LanguageSelectorComponent } from 'src/app/shared/language-selector/language-selector.component';

// primeNG import
import { MessageService } from 'primeng/api';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import { I18NextNamespacePipe } from 'src/app/pipes/i18next-namespace.pipe';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { login } from 'src/app/stores/user/user.actions';

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
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.formData = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      remember: new FormControl(false)
    });
  }

  get usernameIsInvalid() {
    const usernameCtrl = this.formData.controls['username'];
    return usernameCtrl.touched && usernameCtrl.dirty && usernameCtrl.invalid;
  }

  get passwordIsInvalid() {
    const passwordCtrl = this.formData.controls['password'];
    return passwordCtrl.touched && passwordCtrl.dirty && passwordCtrl.invalid;
  }

  handleSubmit() {
    const { username, password, remember } = this.formData.value;
    this.userService
      .login({
        username,
        password
      })
      .subscribe((res) => {
        if (res.code === 0) {
          this.store.dispatch(login({ user: res.data, remember }));

          this.messageService.add({
            severity: 'success',
            summary: this.i18NextService.t('success'),
            detail: this.i18NextService.t('login_success')
          });

          // navigato to dashboard
          this.router.navigate(['/']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: this.i18NextService.t('error', {
              ns: 'error'
            }),
            detail: this.i18NextService.t('login_failed', {
              ns: 'error'
            })
          });
        }
      });
  }

  handleShowToast(inputType: string) {
    const errorMessages = {
      username: 'username_invalid',
      password: 'password_invalid'
    };

    const invalidFlags = {
      username: this.usernameIsInvalid,
      password: this.passwordIsInvalid
    };

    if (errorMessages[inputType as keyof typeof errorMessages] && invalidFlags[inputType as keyof typeof invalidFlags]) {
      this.messageService.add({
        severity: 'warn',
        summary: this.i18NextService.t('warning'),
        detail: this.i18NextService.t(errorMessages[inputType as keyof typeof errorMessages], {
          ns: 'validation'
        })
      });
    }
  }
}
