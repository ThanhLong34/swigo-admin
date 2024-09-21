import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.type';
import { TableDataComponent } from 'src/app/shared/table-data/table-data.component';
import { DatePipe } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { I18NextNamespacePipe } from 'src/app/pipes/i18next-namespace.pipe';
import { CreateOrUpdateUserComponent } from '../create-or-update-user/create-or-update-user.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [SharedModule, TableDataComponent, I18NextModule, I18NextNamespacePipe, DatePipe, CreateOrUpdateUserComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit {
  users: User[] = [];
  seletedUsers: User[] | null = null;
  createOrUpdateDialogVisible = false;

  constructor(private usersService: UsersService) {}

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

  openCreateOrUpdateDialog() {
    this.createOrUpdateDialogVisible = true;
  }

  createOrUpdateSubmit(formValue: any) {
    console.log('🚀 ~ UserManagementComponent ~ createOrUpdateSubmit ~ formValue:', formValue);
  }
}
