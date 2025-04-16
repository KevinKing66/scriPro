import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolesLabel',
  standalone: true
})
export class RolesLabelPipe implements PipeTransform {

  transform(value: 'STUDENT' | 'TEACHER' | 'ADMIN'): unknown {
    if(value === 'STUDENT') {
      return 'Estudiante';
    }
    if(value === 'TEACHER') {
      return 'Profesor';
    }
    if(value === 'ADMIN') {
      return 'Administrador';
    }
    return 'Desconocido';
  }

}
