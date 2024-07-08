import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profil',
  standalone: true
})
export class ProfilPipe implements PipeTransform {

  transform(arrayData : any [], value : number|null): any [] {
    if(value !=0 || value ==null){
      return arrayData =  arrayData.filter((data :any) =>
        data.user_id.pays_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}

