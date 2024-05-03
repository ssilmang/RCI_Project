import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private breukh: HttpClient) {}

  getIndicEntity()
  {
    return this.breukh.get("http://127.0.0.1:8000/api/listIndic")
  }

  searchIndic(libelle: string)
  {
    return this.breukh.get(`http://127.0.0.1:8000/api/searchIndic/${libelle}`)
  }

  createIndic(indic: any, user: number)
  {
    return this.breukh.post(`http://127.0.0.1:8000/api/createIndic/${user}`,
      {
        libelle: indic.libelle,
        formule: indic.formule,
        entite: indic.entite
      })
  }

  updateIndic(indic: any, user: number, id: number)
  {
    return this.breukh.post(`http://127.0.0.1:8000/api/updateIndic/${user}/${id}`,
      {
        libelle: indic.libelle,
        formule: indic.formule,
        entite: indic.entite
      })
  }

  upIndic(indic: any, user: number, id: number)
  {
    return this.breukh.post(`http://127.0.0.1:8000/api/upIndic/${user}/${id}`,
      {
        libelle: indic.libelle,
        formule: indic.formule,
        entite: indic.entite_id
      })
  }

  deleteIndic(user: number, id: number)
  {
    return this.breukh.delete(`http://127.0.0.1:8000/api/deleteIndic/${user}/${id}`)
  }

  createEntite(indic: any)
  {
    return this.breukh.post('http://127.0.0.1:8000/api/createEntity',
      {
        libelle: indic.libelle,
        sigle: indic.sigle
      })
  }

  updateEntite(entite: any, user: number, id: number)
  {
    return this.breukh.post(`http://127.0.0.1:8000/api/updateEntity/${user}/${id}`,
      {
        libelle: entite.libelle,
        sigle: entite.sigle
      })
  }

  deleteEntity(user: number,id: number)
  {
    return this.breukh.delete(`http://127.0.0.1:8000/api/deleteEntity/${user}/${id}`)
  }

  getDatas()
  {
    return this.breukh.get("http://127.0.0.1:8000/api/listData")
  }

  getEntiteByEntiteIndic(id: number)
  {
    return this.breukh.get(`http://127.0.0.1:8000/api/getEntiteByEntiteIndic/${id}`)
  }

  upData(indic: any)
  {
    return this.breukh.post('http://127.0.0.1:8000/api/updataData', indic)
  }

  updateUser(indic: any, id: number)
  {
    return this.breukh.post(`http://localhost:8000/api/update/${id}`, indic)
  }

  userDoneFalse()
  {
    return this.breukh.get("http://127.0.0.1:8000/api/userDoneFalse")
  }

  upUserToTrue(id: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/upUserToTrue/${id}`);
  }

  upUserToFalse() {
    return this.breukh.get('http://127.0.0.1:8000/api/upUserToFalse');
  }

}
