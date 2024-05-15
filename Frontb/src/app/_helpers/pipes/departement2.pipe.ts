import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departement2',
  standalone: true
})
export class Departement2Pipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.departement_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
