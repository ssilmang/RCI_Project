import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
  standalone: true
})
export class TypePipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.controle_id.type_controle_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
