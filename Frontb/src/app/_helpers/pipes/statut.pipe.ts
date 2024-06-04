import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statut',
  standalone: true
})
export class StatutPipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.etat == value
      )
    }else{
      return arrayData;
    }
  }

}
