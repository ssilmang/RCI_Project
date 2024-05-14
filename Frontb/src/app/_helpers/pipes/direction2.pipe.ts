import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'direction2',
  standalone: true
})
export class Direction2Pipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.direction_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
