import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginDto } from '../models/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/auth';
  isRequiredHttps = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(user: LoginDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  setToken(token: string): void {
    this.cookieService.set('auth_token', token, { secure: this.isRequiredHttps });
  }

  getToken(): string {
    return this.cookieService.get('auth_token');
  }

  logout(): void {
    this.cookieService.delete('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verifica si el token existe
  }

}
