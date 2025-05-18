import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../features/authentication/models/user.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginDto } from '../../features/authentication/models/login.dto';
import { environment } from '../../../enviroments/enviroment';
import { ChangePassword } from '../../features/authentication/models/change-password';
import { ForgotPassword } from '../../features/authentication/models/forgot-password';
import { UserWithToken } from '../../features/authentication/models/user-with-token.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly backendUrl = environment.url;
  private readonly apiUrl = this.backendUrl + '/auth';
  isRequiredHttps = false;

  constructor(private http: HttpClient, private cookieService: CookieService, private storageService: StorageService) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  changePassword(credentials: ChangePassword): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/change-password`, credentials);
  }

  forgotPassword(credentials: ForgotPassword): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/change-password`, credentials);
  }

  login(user: LoginDto): Observable<UserWithToken> {
    return this.http.post<UserWithToken>(`${this.apiUrl}/login`, user);
  }

  setToken(token: string): void {
    this.cookieService.set('auth_token', token, { secure: this.isRequiredHttps });
  }

  getToken(): string {
    return this.cookieService.get('auth_token');
  }

  // setUser(user: User): void {
  //   this.cookieService.set('user', JSON.stringify(user));
  // }

  getEmail(): string {
    // return this.cookieService.get('user') as User['email'];
    const user = this.storageService.getSession();
    return user ? user.email : '';
  }

  logout(): void {
    this.cookieService.delete('auth_token');
    this.storageService.clearSession();
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verifica si el token existe
  }

}
