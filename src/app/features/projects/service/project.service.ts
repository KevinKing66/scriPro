import { Injectable } from '@angular/core';
import { Projects } from '../model/project.model';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly backendUrl = environment.url;
  private readonly apiUrl = this.backendUrl + '/projects';

  constructor(private http: HttpClient) { }

  create(project: Projects): Observable<Projects> {
    return this.http.post<Projects>(`${this.apiUrl}`, project);
  }

  update(_id: string, project: Projects): Observable<Projects> {
    return this.http.patch<Projects>(`${this.apiUrl}/${_id}`, project);
  }

  findOne(_id: string): Observable<Projects> {
    return this.http.get<Projects>(`${this.apiUrl}/${_id}`);
  }

  findAll(filter: string = "", page: number = 0, maxElements: number = 5): Observable<Projects> {
    filter = encodeURI(filter);
    return this.http.get<Projects>(`${this.apiUrl}?page=${page}&limit=${maxElements}&keyword=${filter}`);
  }
}
