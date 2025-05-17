import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'researchGroupsLabel'
})
export class ResearchGroupsLabelPipe implements PipeTransform {

  transform(list: {code: string, name: string}[] | undefined, ...args: unknown[]): unknown {
    if(list){
      return list.map(e => e.name).join(', ');
    }
    return "";
  }

}
