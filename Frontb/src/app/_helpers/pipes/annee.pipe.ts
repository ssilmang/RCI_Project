import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'annee',
  standalone: true
})
export class AnneePipe implements PipeTransform {

  transform(items: any[], year: any): any[] {
    if (!items || year == null || year == 0) {
      return items;
    }
    return items.filter(item => item.date_ajout.substring(0, 4) === year.toString());
  }

}
