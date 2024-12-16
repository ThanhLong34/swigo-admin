import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpResponse, HttpResponseList } from '../types/http/response.type';
import { CreateUser, GetUserList, User } from '../types/user.type';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUserList(pageInfo: GetUserList) {
    // const params = new HttpParams({
    //   fromObject: pageInfo as any
    // });
    // return this.http.get<HttpResponseList<User>>(`${this.apiUrl}`, {
    //   params
    // });

    const res: HttpResponseList<User> = {
      code: 0,
      message: 'Get user list successfully',
      data: {
        list: [
          {
            id: 1,
            uuid: 'abc1',
            username: 'admin1',
            email: 'admin1@admin.com',
            nickName: 'Admin1',
            createdAt: Date.now().toString(),
            updatedAt: '',
            deletedAt: null
          },
          {
            id: 2,
            uuid: 'abc2',
            username: 'admin2',
            email: 'admin2@admin.com',
            nickName: 'Admin2',
            createdAt: Date.now().toString(),
            updatedAt: '',
            deletedAt: null
          },
          {
            id: 3,
            uuid: 'abc3',
            username: 'admin3',
            email: 'admin3@admin.com',
            nickName: 'Admin3',
            createdAt: Date.now().toString(),
            updatedAt: '',
            deletedAt: null
          }
        ],
        pageNumber: 1,
        pageSize: 10,
        totalItems: 3,
        totalPages: 1,
        sort: '',
      }
    };

    return of(res);
  }

  createUser(user: CreateUser) {
    return this.http.post<HttpResponse<User>>(`${this.apiUrl}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<HttpResponse<User>>(`${this.apiUrl}/${id}`);
  }

  deleteUserByIds(ids: number[]) {
    return this.http.delete<HttpResponse<User>>(`${this.apiUrl}/deleteByIds`, {
      params: {
        ids: ids.join(',')
      }
    });
  }
}
