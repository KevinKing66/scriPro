import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from '../enums/role.enum';

@Pipe({
  name: 'roleLabel'
})
export class RoleLabelPipe implements PipeTransform {
  transform(roleKey: string): string {
    return Roles[roleKey as keyof typeof Roles] || "Desconocido"; // Mapeo de clave a valor
  }

}
