import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUserList({ pageSize: 2, pageNumber: 1 }).subscribe((res) => {
      console.log("🚀 ~ UserManagementComponent ~ this.usersService.getUserList ~ res:", res)
      if (res.code === 0) {
        this.users = res.data.list;
      }
    });
  }
}
