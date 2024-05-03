import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicEntity'
})
export class IndicEntityPipe implements PipeTransform {

  transform(arrayData : any [], value : string ): any [] {
    if(value!='all'){
      return arrayData =  arrayData.filter((data :any) =>
        data.sigle == value
      )
    }else{
      return arrayData;
    }
  }

}
