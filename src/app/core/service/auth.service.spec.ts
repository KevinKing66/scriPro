import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from '../../features/authentication/models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        CookieService,
        provideHttpClientTesting(), // Uso del nuevo sistema de pruebas HTTP
      ],
    });

    service = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request for register', () => {
    const mockUser: User = {
      "email": "kevinvallenato2002@gmail.com",
      "code": "20250",
      "name": "Kevin",
      "lastName": "Caicedo",
      "password": "test1234",
      "role": "ADMIN",
      "status": "ACTIVE",
      "docNum": "1003235293",
      "docType": "CC",
      "phone": "+573158618906"
    };
    service.register(mockUser).subscribe((response) => {
      expect(response).toEqual(mockUser);
    });
  });

  it('should store token in cookies', () => {
    const token = 'mockToken';
    spyOn(cookieService, 'set');

    service.setToken(token);
    expect(cookieService.set).toHaveBeenCalledWith('auth_token', token, { secure: service.isRequiredHttps });
  });

  it('should check if user is logged in', () => {
    spyOn(cookieService, 'get').and.returnValue('mockToken');
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeTrue();
  });

  it('should return false if no token is found', () => {
    spyOn(cookieService, 'get').and.returnValue('');
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeFalse();
  });
});
