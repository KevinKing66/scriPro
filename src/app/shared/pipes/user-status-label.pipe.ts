import { Pipe, PipeTransform } from '@angular/core';
import { UserStatus } from '../enums/status.enum';

@Pipe({
  name: 'userStatusLabel'
})
export class UserStatusLabelPipe implements PipeTransform {

  transform(key: string): string {
    return UserStatus[key as keyof typeof UserStatus] || "Desconocido"; // Mapeo de clave a valor
  }
}
