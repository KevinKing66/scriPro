import { Injectable } from '@angular/core';
import { Projects } from '../model/project.model';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly backendUrl = environment.url;
  private readonly apiUrl = this.backendUrl + '/projects';

  create(project: Projects): import("rxjs").Observable<Projects> {
    throw new Error('Method not implemented.');
  }

  update(uuid: string, project: Projects): import("rxjs").Observable<Projects> {
    throw new Error('Method not implemented.');
  }

  findOne(uuid: string): import("rxjs").Observable<Projects> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
