import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pole',
  standalone: true
})
export class PolePipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.pole_id == value
      )
    }else{
      return arrayData;
    }
  }

}
