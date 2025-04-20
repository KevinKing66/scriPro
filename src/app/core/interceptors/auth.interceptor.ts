import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; // Asegúrate de instalar ngx-cookie-service

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectar el servicio de cookies
  const cookieService = inject(CookieService);

  // Obtener el token desde las cookies
  const token = cookieService.get('auth_token');

  // Si existe el token, modificar la solicitud para incluir el encabezado
  const clonedReq = token
    ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    })
    : req;

  console.log('Interceptando la solicitud:', clonedReq); // Para depuración
  console.log('Token de autorización:', token); // Para depuración

  // Pasar la solicitud al siguiente handler
  return next(clonedReq);
};
