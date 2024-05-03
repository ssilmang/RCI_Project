import { Pipe, PipeTransform } from '@angular/core';
import { Entity } from '../interfaces/entity';

@Pipe({
  name: 'entity'
})
export class EntityPipe implements PipeTransform {

  transform(arrayData : any [], value : string ): any [] {
    if(!!value){
      return arrayData =  arrayData.filter((data :any) =>
        data.entity === value
      )
    }else{
      return arrayData;
    }
  }

}
