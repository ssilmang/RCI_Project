import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'service2',
  standalone: true
})
export class Service2Pipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.service_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
