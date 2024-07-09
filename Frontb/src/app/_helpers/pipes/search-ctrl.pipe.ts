import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCtrl',
  standalone: true
})
export class SearchCtrlPipe implements PipeTransform {

  transform(arrayData : any [], value : string|null ): any [] {
    if(!!value){
      return arrayData =  arrayData.filter((data :any) =>
        data.controle.startsWith(value.toString())
      )
    }else{
      return arrayData;
    }
  }

}
