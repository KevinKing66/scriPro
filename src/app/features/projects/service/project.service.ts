import { Injectable } from '@angular/core';
import { Project } from '../model/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../core/models/pagineted-response.model';
import { UpdateProject } from '../model/update-project.model';
import { environment } from '../../../../enviroments/enviroment.prod';

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

  update(_id: string, project: UpdateProject): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${_id}`, project);
  }

  findOne(_id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${_id}`);
  }

  findAll(filter: string = "", page: number = 0, maxElements: number = 5, sortBy?: string, order?: string, startDate?: string, endDate?: string): Observable<PaginatedResponse<Project>> {
    filter = encodeURI(filter);
    let url = `${this.apiUrl}?page=${page}&limit=${maxElements}&keyword=${filter}`;
    if (sortBy) {
      url += `&sortBy=${sortBy}`;
    }
    if (order) {
      url += `&order=${order}`;
    }
    if (startDate) {
      url += `&startDate=${startDate}`;
    }
    if (endDate) {
      url += `&endDate=${endDate}`;
    }
    return this.http.get<PaginatedResponse<Project>>(url);
  }

  findAllWithOuthPagination(filter: string = "", sortBy?: string, order?: string, startDate?: string, endDate?: string): Observable<Project[]> {
    filter = encodeURI(filter);
    let url = `${this.apiUrl}/non-paginated?keyword=${filter}`;
    if (sortBy) {
      url += `&sortBy=${sortBy}`;
    }
    if (order) {
      url += `&order=${order}`;
    }
    if (startDate) {
      url += `&startDate=${startDate}`;
    }
    if (endDate) {
      url += `&endDate=${endDate}`;
    }
    return this.http.get<Project[]>(url);
  }
}
