import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.type';
import { TableDataComponent } from 'src/app/shared/table-data/table-data.component';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import { I18NextNamespacePipe } from 'src/app/pipes/i18next-namespace.pipe';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, TableDataComponent, I18NextModule, I18NextNamespacePipe, DatePipe],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit {
  users: User[] = [];
  seletedUsers: User[] | null = null;

  createOrUpdateFormData!: FormGroup;

  constructor(
    private messageService: MessageService,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private usersService: UsersService
  ) {
    this.createOrUpdateFormData = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nickName: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.usersService.getUserList({ pageSize: 10, pageNumber: 1 }).subscribe((res) => {
      if (res.code === 0) {
        this.users = res.data.list;
      }
    });
  }

  openCreateUserDialog() {}

  deleteSelectedUsers() {}

  showToastValidateForm(inputType: string) {
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

  get usernameIsInvalid() {
    const usernameCtrl = this.createOrUpdateFormData.controls['username'];
    return usernameCtrl.touched && usernameCtrl.dirty && usernameCtrl.invalid;
  }

  get passwordIsInvalid() {
    const passwordCtrl = this.createOrUpdateFormData.controls['password'];
    return passwordCtrl.touched && passwordCtrl.dirty && passwordCtrl.invalid;
  }
}
