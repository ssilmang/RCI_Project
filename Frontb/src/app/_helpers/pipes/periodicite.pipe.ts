import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodicite',
  standalone: true
})
export class PeriodicitePipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.periodicite == value
      )
    }else{
      return arrayData;
    }
  }

}
