import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ResearchGroup } from '../../features/research-group/models/research-group.model';
import { PaginatedResponse } from '../models/pagineted-response.model';
import { environment } from '../../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class ResearchGroupsService {
  private readonly backendUrl = environment.url;
  private readonly apiUrl = this.backendUrl + '/research-groups';
  isRequiredHttps = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  findAll(): Observable<ResearchGroup[]> {
    return this.http.get<ResearchGroup[]>(`${this.apiUrl}`);
  }

  findAllWithPagination(filter: string = "", page: number = 1, maxElements: number = 5): Observable<PaginatedResponse<ResearchGroup>> {
    return this.http.get<PaginatedResponse<ResearchGroup>>(`${this.apiUrl}/paginated?page=${page}&limit=${maxElements}&keyword=${filter}`);
  }

  findOne(code: string): Observable<ResearchGroup> {
    return this.http.get<ResearchGroup>(`${this.apiUrl}/${code}`);
  }
  create(researchGroup: ResearchGroup): Observable<ResearchGroup> {
    return this.http.post<ResearchGroup>(`${this.apiUrl}`, researchGroup);
  }
  update(code: string, researchGroup: ResearchGroup): Observable<ResearchGroup> {
    return this.http.patch<ResearchGroup>(`${this.apiUrl}/${code}`, researchGroup);
  }
}
