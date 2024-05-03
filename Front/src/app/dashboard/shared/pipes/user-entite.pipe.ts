import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userEntite'
})
export class UserEntitePipe implements PipeTransform {

  transform(arrayData: any[], value: number): any[] {
    if(value != 0) {
      return arrayData.filter((data: any) =>
        data.entite_id && data.entite_id.id == value
      );
    }else{
      return arrayData;
    }
  }



}
