import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porteur',
  standalone: true
})
export class PorteurPipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.user_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
