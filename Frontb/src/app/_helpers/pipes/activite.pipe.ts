import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activite',
  standalone: true
})
export class ActivitePipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.activite_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
