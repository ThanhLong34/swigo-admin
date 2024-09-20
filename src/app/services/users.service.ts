import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpResponseList } from '../types/http/response.type';
import { GetUserList, User } from '../types/user.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUserList(pageInfo: GetUserList) {
    const params = new HttpParams({
      fromObject: pageInfo as any
    });
    return this.http.get<HttpResponseList<User>>(`${this.apiUrl}`, {
      params
    });
  }
}
