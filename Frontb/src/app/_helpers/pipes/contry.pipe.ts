import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contry',
  standalone: true
})
export class ContryPipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.pays_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
