import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validate',
  standalone: true
})
export class ValidatePipe implements PipeTransform {

  transform(arrayData : any [], value : number|null ): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.validate == value
      )
    }else{
      return arrayData;
    }
  }

}
