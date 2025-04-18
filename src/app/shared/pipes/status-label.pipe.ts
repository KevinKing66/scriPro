import { Pipe, PipeTransform } from '@angular/core';
import { UserStatus } from '../enums/status.enum';

@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {
  /**
   * Transforms the status value to a human-readable label.
   * @param key The status value to transform.
   * @returns The transformed status label.
   */
  transform(key: string): string {
    return UserStatus[key as keyof typeof UserStatus] || "Desconocido"; // Mapeo de clave a valor
  }

}
