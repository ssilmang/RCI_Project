import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'service',
  standalone: true
})
export class ServicePipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.service_id == value
      )
    }else{
      return arrayData;
    }
  }

}
