import { Injectable } from '@angular/core';
import { Member } from '../../features/projects/model/create-project.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly sessionKey = "session";

  constructor() { }

  setSession(data: any): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(data));
  }

  getSession(): any | null {
    const session = localStorage.getItem(this.sessionKey);
    return session ? JSON.parse(session) : null;
  }

  clearSession(): void {
    localStorage.removeItem(this.sessionKey);
  }

  isLoggedIn(): boolean {
    return this.getSession() !== null;
  }

  getAdminId(): Member {
    return {
      "email": "kevin.caicedo.d@uniautonoma.edu",
      "name": "Kevin Caicedo"
    };
  }
}
