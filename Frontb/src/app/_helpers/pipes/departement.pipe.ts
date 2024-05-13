import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departement',
  standalone: true
})
export class DepartementPipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.departement_id == value
      )
    }else{
      return arrayData;
    }
  }

}
