import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'polectrl',
  standalone: true
})
export class PolectrlPipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.pole_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
