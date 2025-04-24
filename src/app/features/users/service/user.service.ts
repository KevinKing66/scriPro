import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { User } from '../../authentication/models/user.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly backendUrl = environment.url;
  private readonly apiUrl = this.backendUrl + '/users';
  isRequiredHttps = false;

  constructor(private http: HttpClient) { }

  update(uuid: string, user: User): import("rxjs").Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${uuid}`, user);
  }

  findOne(email: string): import("rxjs").Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${email}`);
  }
}
