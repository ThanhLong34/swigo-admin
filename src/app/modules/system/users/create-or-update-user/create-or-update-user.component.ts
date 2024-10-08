import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import { MessageService } from 'primeng/api';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { I18NextNamespacePipe } from 'src/app/pipes/i18next-namespace.pipe';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-create-or-update-user',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, I18NextModule, I18NextNamespacePipe],
  templateUrl: './create-or-update-user.component.html',
  styleUrl: './create-or-update-user.component.scss'
})
export class CreateOrUpdateUserComponent {
  formData!: FormGroup;
  visible = false;
  dialogType: 'create' | 'update' = 'create';

  @Output() afterSubmit = new EventEmitter();
  @Output() afterOpen = new EventEmitter();
  @Output() afterClose = new EventEmitter();

  constructor(
    private messageService: MessageService,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private usersService: UsersService
  ) {
    this.formData = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nickName: new FormControl('', [Validators.required])
    });
  }

  private _rebuildFormControlsForCreate() {
    if (!this.formData.controls['password']) {
      this.formData.addControl('password', new FormControl('', [Validators.required, Validators.minLength(6)]));
    }
  }

  private _rebuildFormControlsForUpdate() {
    this.formData.removeControl('password');
  }

  open(data: User | null = null) {
    this.visible = true;
    if (data) {
      this.dialogType = 'update';
      this._rebuildFormControlsForUpdate();
      this.formData.patchValue(data);
    } else {
      this.dialogType = 'create';
      this._rebuildFormControlsForCreate();
      this.formData.reset();
    }
    this.afterOpen.emit();
  }

  close() {
    this.visible = false;
    this.afterClose.emit();
  }

  submitFunc() {
    this.usersService.createUser(this.formData.value).subscribe((res) => {
      if (res.code === 0) {
        this.messageService.add({
          severity: 'success',
          summary: this.i18NextService.t('success'),
          detail: this.i18NextService.t('create_user_success')
        });
        this.close();
        this.afterSubmit.emit(this.formData.value);
      }
    });
  }

  showToastValidateForm(inputType: string) {
    const errorMessages = {
      username: 'username_invalid',
      password: 'password_invalid',
      email: 'email_invalid',
      nickName: 'nick_name_invalid',
    };

    const invalidFlags = {
      username: this.usernameIsInvalid,
      password: this.passwordIsInvalid,
      email: this.emailIsInvalid,
      nickName: this.nickNameIsInvalid,
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

  get usernameIsInvalid() {
    const usernameCtrl = this.formData.controls['username'];
    return usernameCtrl.touched && usernameCtrl.dirty && usernameCtrl.invalid;
  }

  get passwordIsInvalid() {
    const passwordCtrl = this.formData.controls['password'];
    if (passwordCtrl) {
      return passwordCtrl.touched && passwordCtrl.dirty && passwordCtrl.invalid;
    }
    return false;
  }

  get emailIsInvalid() {
    const emailCtrl = this.formData.controls['email'];
    return emailCtrl.touched && emailCtrl.dirty && emailCtrl.invalid;
  }

  get nickNameIsInvalid() {
    const nickNameCtrl = this.formData.controls['nickName'];
    return nickNameCtrl.touched && nickNameCtrl.dirty && nickNameCtrl.invalid;
  }
}
