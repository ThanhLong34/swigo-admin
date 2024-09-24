import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.type';
import { TableDataComponent } from 'src/app/shared/table-data/table-data.component';
import { DatePipe } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { I18NextNamespacePipe } from 'src/app/pipes/i18next-namespace.pipe';
import { CreateOrUpdateUserComponent } from '../create-or-update-user/create-or-update-user.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { mapHttpPaginationResponse } from 'src/app/utils/http.util';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [SharedModule, TableDataComponent, I18NextModule, I18NextNamespacePipe, DatePipe, CreateOrUpdateUserComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  pageInfo = {
    pageSize: 10,
    pageNumber: 1,
    totalItems: 0,
    totalPages: 0,
  }
  users: User[] = [];
  seletedUsers: User[] | null = null;
  createOrUpdateDialogVisible = false;

  @ViewChild('tableData', { static: true }) tableData!: TableDataComponent;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUserList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchUserList() {
    console.log(this.pageInfo)
    this.usersService.getUserList(this.pageInfo).pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (res.code === 0) {
        this.users = res.data.list ?? [];
        this.pageInfo = mapHttpPaginationResponse(res);
      }
    });
  }

  openCreateOrUpdateDialog() {
    this.createOrUpdateDialogVisible = true;
  }

  reloadData() {
    this.fetchUserList();
  }

  showContextMenu(event: MouseEvent, user: User) {
    this.tableData.showContextMenu(event, user);
  }

  changePage(e: { pageNumber: number, pageSize: number }) {
    this.pageInfo.pageNumber = e.pageNumber;
    this.pageInfo.pageSize = e.pageSize
    this.fetchUserList();
  }
}
