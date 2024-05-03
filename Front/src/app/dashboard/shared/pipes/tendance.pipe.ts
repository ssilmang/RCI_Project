import { Pipe, PipeTransform } from '@angular/core';
import { Data } from '../interfaces/data';

@Pipe({
  name: 'tendance'
})
export class TendancePipe implements PipeTransform {

  transform(arrayData: Data[], niveauFiltre: string): any {
    if (niveauFiltre === 'Forte') {
      return arrayData.filter((el: any) => (el.taux?.replace('%', '') ?? '0') >= 100);
    } else if (niveauFiltre === 'Modérée') {
      return arrayData.filter((el: any) => (el.taux?.replace('%', '') ?? '0') < 100 && (el.taux?.replace('%', '') ?? '0') >= 80);
    } else if (niveauFiltre === 'Basse') {
      return arrayData.filter((el: any) => (el.taux?.replace('%', '') ?? '0') < 80 && (el.taux?.replace('%', '') ?? '0') >= 1);
    } else {
      return arrayData;
    }
  }

}
