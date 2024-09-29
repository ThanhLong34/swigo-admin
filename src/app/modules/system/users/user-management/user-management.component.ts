import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.type';
import { TableDataComponent } from 'src/app/shared/table-data/table-data.component';
import { DatePipe } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { I18NextNamespacePipe } from 'src/app/pipes/i18next-namespace.pipe';
import { CreateOrUpdateUserComponent } from '../create-or-update-user/create-or-update-user.component';
import { Subject, takeUntil } from 'rxjs';
import { ChangePageEvent, PaginationResponse } from 'src/app/types/pagination.type';
import { mapPageInfoResponse, mapResultListResponse } from 'src/app/utils/http.util';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [SharedModule, TableDataComponent, I18NextModule, I18NextNamespacePipe, DatePipe, CreateOrUpdateUserComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export default class UserManagementComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  pageInfo: PaginationResponse<User> = {
    pageSize: 10,
    pageNumber: 1,
    totalItems: 0,
    totalPages: 0,
    sort: undefined
  };
  users: User[] = [];
  seletedUsers: User[] | null = null;

  @ViewChild('tableData', { static: true }) tableData!: TableDataComponent;
  @ViewChild('createOrUpdateUserDialog', { static: true }) createOrUpdateUserDialog!: CreateOrUpdateUserComponent;

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.fetchUserList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchUserList() {
    this.usersService
      .getUserList(this.pageInfo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.code === 0) {
          mapResultListResponse(this.users, res);
          mapPageInfoResponse(this.pageInfo, res);
        }
      });
  }

  openCreateOrUpdateDialog() {
    this.createOrUpdateUserDialog.open();
  }

  reloadData() {
    this.fetchUserList();
  }

  showContextMenu(event: MouseEvent, user: User) {
    this.tableData.showContextMenu(event, user);
  }

  changePage(e: ChangePageEvent) {
    this.pageInfo.pageNumber = e.pageNumber;
    this.pageInfo.pageSize = e.pageSize;
    this.fetchUserList();
  }

  sortData(sortQuery: string) {
    this.pageInfo.sort = sortQuery;
    this.fetchUserList();
  }

  batchDeleteData(data: { event: MouseEvent; selectedData: User[] }) {
    console.log('🚀 ~ UserManagementComponent ~ batchDeleteData ~ e:', data.event);
    this.confirmationService.confirm({
      target: data.event.target as EventTarget,
      message: 'Are you sure you want to delete the selected users?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger ml-2',
      accept: () => {
        console.log('Delete users:', data.selectedData);
      }
    });
  }
}
