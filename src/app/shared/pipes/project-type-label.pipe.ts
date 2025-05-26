import { Pipe, PipeTransform } from '@angular/core';
import { ProjectsTypesEnum } from '../enums/proyect-type.enum';

@Pipe({
  name: 'projectTypeLabel'
})
export class ProjectTypeLabelPipe implements PipeTransform {

  transform(value?: string): unknown {
    if(!value) {
      return "Sin definir";
    }
    return ProjectsTypesEnum[value as keyof typeof ProjectsTypesEnum] || "Sin definir";
  }

}
