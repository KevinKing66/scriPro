import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ResearchGroup } from '../../features/research-group/models/research-group.model';

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

  find(code: string): Observable<ResearchGroup> {
    return this.http.get<ResearchGroup>(`${this.apiUrl}/${code}`);
  }
  create(researchGroup: ResearchGroup): Observable<ResearchGroup> {
    return this.http.post<ResearchGroup>(`${this.apiUrl}`, researchGroup);
  }
  update(code: string, researchGroup: ResearchGroup): Observable<ResearchGroup> {
    return this.http.patch<ResearchGroup>(`${this.apiUrl}/${code}`, researchGroup);
  }
}
