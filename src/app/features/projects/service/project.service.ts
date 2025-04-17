import { Injectable } from '@angular/core';
import { Projects } from '../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  create(project: Projects): import("rxjs").Observable<Projects> {
    throw new Error('Method not implemented.');
  }

  update(uuid: string, project: Projects): import("rxjs").Observable<Projects> {
    throw new Error('Method not implemented.');
  }

  getById(uuid: string): import("rxjs").Observable<Projects> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
