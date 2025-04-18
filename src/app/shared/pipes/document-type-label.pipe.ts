import { Pipe, PipeTransform } from '@angular/core';
import { DocumentTypes } from '../enums/document-type.enum';

@Pipe({
  name: 'documentTypeLabel'
})
export class DocumentTypeLabelPipe implements PipeTransform {

  transform(key: string): string {
    return DocumentTypes[key as keyof typeof DocumentTypes] || "Desconocido";
  }

}
