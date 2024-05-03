import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userProfil'
})
export class UserProfilPipe implements PipeTransform {

  transform(arrayData : any [], value : number ): any [] {
    if(value!=0){
      return arrayData =  arrayData.filter((data :any) =>
        data.profil_id.id == value
      )
    }else{
      return arrayData;
    }
  }

}
