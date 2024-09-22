import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { User } from "../types/user.type";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true
    });
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          const userLogin = JSON.parse(localStorage.getItem('userLogin') as string) as User;
          if (userLogin && userLogin.uuid) {
            return this.authService.refreshSession(userLogin.uuid).pipe(
              switchMap((newSession: any) => {
                const newReq = req.clone({
                  withCredentials: true
                });
                return next.handle(newReq);
              }),
              catchError((refreshError) => {
                return throwError(refreshError);
              })
            );
          }
        }
        return throwError(error);
      })
    );
  }
}
