import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'direction',
  standalone: true
})
export class DirectionPipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.direction_id == value
      )
    }else{
      return arrayData;
    }
  }

}
