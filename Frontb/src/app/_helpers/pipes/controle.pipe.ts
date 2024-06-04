import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controle',
  standalone: true
})
export class ControlePipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.nom == value
      )
    }else{
      return arrayData;
    }
  }

}
