import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../types/http/response.type';
import { User, UserLogin } from '../types/user.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/users';
  private _isLoggedIn = false;
  private _userLoggedIn: User | null = null;

  get userLoggedIn() {
    return this._userLoggedIn;
  }
  set userLoggedIn(user: User | null) {
    this._userLoggedIn = user;
    this._isLoggedIn = !!user && !!user.id;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  constructor(private http: HttpClient) {}

  whoAmI() {
    return this.http.get(`${this.apiUrl}/whoami`);
  }

  refreshSession(uuid: string) {
    return this.http.post(`${this.apiUrl}/refreshSession`, { uuid });
  }

  login(user: UserLogin) {
    return this.http.post<HttpResponse<User>>(`${this.apiUrl}/signin`, user);
  }

  logout() {
    this.userLoggedIn = null;
    return this.http.post(`${this.apiUrl}/signout`, {});
  }
}
