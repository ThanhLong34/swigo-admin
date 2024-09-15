import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../types/http/response.type';
import { User, UserLogin } from '../types/user.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  whoAmI() {
    return this.http.get(`${this.apiUrl}/whoami`);
  }

  login(user: UserLogin) {
    return this.http.post<HttpResponse<User>>(`${this.apiUrl}/signin`, user);
  }
}
