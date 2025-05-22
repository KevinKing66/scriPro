import { Injectable } from '@angular/core';
import { User } from '../../authentication/models/user.model';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PaginatedResponse } from '../../../core/models/pagineted-response.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly backendUrl = environment.url;
  private readonly apiUrl = this.backendUrl + '/users';
  isRequiredHttps = false;

  constructor(private http: HttpClient) { }

  update(uuid: string, user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${uuid}`, user);
  }

  findOne(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${email}`);
  }

  findAll(filter: string = "", page: number = 0, maxElements: number = 5): Observable<PaginatedResponse<User>> {
    filter = encodeURI(filter);
    return this.http.get<PaginatedResponse<User>>(`${this.apiUrl}?page=${page}&limit=${maxElements}&keyword=${filter}`);
  }
}
