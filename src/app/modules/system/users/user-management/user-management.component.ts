import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.type';
import { TableDataComponent } from 'src/app/shared/table-data/table-data.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [SharedModule, TableDataComponent, DatePipe],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit {
  users: User[] = [];
  seletedUsers: User[] | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUserList({ pageSize: 10, pageNumber: 1 }).subscribe((res) => {
      if (res.code === 0) {
        this.users = res.data.list;
      }
    });
  }

  openCreateUserDialog() {

  }

  deleteSelectedUsers() {

  }
}
