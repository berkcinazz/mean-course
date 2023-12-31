import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated: boolean = false;
  private token: string;
  private tokenTimer:any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient,
    private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string, expiresIn:number }>('http://localhost:3000/api/user/login', authData)
      .subscribe((response) => {
        this.token = response.token;
        if (this.token) {
          const expiresDuration = response.expiresIn;
          this.tokenTimer = setTimeout(()=>{
            this.logout();
          },expiresDuration * 1000);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
}
