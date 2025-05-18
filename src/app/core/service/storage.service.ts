import { Injectable } from '@angular/core';
import { Member } from '../../features/projects/model/create-project.model';
import { User } from '../../features/authentication/models/user.model';

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

  getUserEmailAndName(): Member {
    const data = localStorage.getItem(this.sessionKey);
    const user = JSON.parse(data!) as User;
    return {
      "email": user.email,
      "name": user.name
    };
  }
}
