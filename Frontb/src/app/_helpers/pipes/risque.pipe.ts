import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'risque',
  standalone: true
})
export class RisquePipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.risque_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
