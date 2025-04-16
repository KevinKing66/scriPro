import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {
  /**
   * Transforms the status value to a human-readable label.
   * @param value The status value to transform.
   * @returns The transformed status label.
   */
  transform(value: 'ACTIVE' | 'INACTIVE'): string {
    return value === 'ACTIVE' ? 'Activo' : 'Inactivo';
  }

}
