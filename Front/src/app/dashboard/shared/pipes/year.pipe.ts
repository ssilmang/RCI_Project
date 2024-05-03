import { Pipe, PipeTransform } from '@angular/core';
import { Year } from '../interfaces/year';

@Pipe({
  name: 'year'
})
export class YearPipe implements PipeTransform {

  transform(arrayData : any [], value : string ): any [] {
    if(arrayData && !!value){
      return arrayData =  arrayData.filter((data :any) =>
        data.annee == value
      )
    }else{
      return arrayData;
    }
  }

}
