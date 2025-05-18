import { Injectable } from '@angular/core';
import { Project } from '../model/project.model';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../core/models/pagineted-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly backendUrl = environment.url;
  private readonly apiUrl = this.backendUrl + '/projects';

  constructor(private http: HttpClient) { }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}`, project);
  }

  update(_id: string, project: Project): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${_id}`, project);
  }

  findOne(_id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${_id}`);
  }

  findAll(filter: string = "", page: number = 0, maxElements: number = 5): Observable<PaginatedResponse<Project>> {
    filter = encodeURI(filter);
    return this.http.get<PaginatedResponse<Project>>(`${this.apiUrl}?page=${page}&limit=${maxElements}&keyword=${filter}`);
  }
}
