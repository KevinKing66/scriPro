import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  private filterSubject = new BehaviorSubject<string>('');
  filter$ = this.filterSubject.asObservable();

  setFilter(value: string) {
    this.filterSubject.next(value);
  }

  get currentFilter() {
    return this.filterSubject.value;
  }
}
