import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IndicEntityPipe } from 'src/app/dashboard/shared/pipes/indic-entity.pipe';
import { CrudService } from 'src/app/dashboard/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-indicateur',
  templateUrl: './indicateur.component.html',
  styleUrls: ['./indicateur.component.css'],
  providers: [ IndicEntityPipe]
})
export class IndicateurComponent {

  title!: string
  titre!: string
  op: string = 'add'
  selectedItem: any;
  entity!: string;
  entityToUp!: string
  indicateur!: string
  indicateurToUp!: string
  newIndic!: string
  selectedEntity: string = 'all'
  datas:any = []
  indic:any[]=[]
  idIndic!: number
  id_entite!: number
  ent!: string
  display: boolean = true
  id!: number

  entites!: FormGroup;
  modal!: FormGroup;


  constructor(private crud: CrudService, private fb: FormBuilder, private toastr: ToastrService){
    this.entites = this.fb.group({
      option: ['all'],

    });

    this.modal = this.fb.group({
      libelle: [''],
      formule: [''],
      entite: ['all']
    });

    this.entites.get('option')?.valueChanges.subscribe((value: any) => {
      console.log(value);
      this.selectedEntity = value
    });


  }

  ngOnInit(){
    this.recupDatas()

    let userFromStorage = localStorage.getItem('user');
    let user = JSON.parse(userFromStorage!)
    this.id = user.id
    if (user.profil_id.libelle=='Utilisateur') {
      this.display = false
    }else{
      this.display = true
    }
  }

  recupDatas()
  {
    this.crud.getIndicEntity().subscribe((indic:any) =>{
      this.datas = indic.data
      // console.log(this.datas);
    })
  }

  addOrUpIndic() {
    if (this.op=='add') {
      // console.log(this.modal.value);
      let entite = this.modal.value.entite
      let id
      this.datas.forEach((element:any) => {
        if (element.sigle == entite) {
          id = element.id
        }
      });
      let data = {
        libelle: this.modal.value.libelle,
        formule: this.modal.value.formule,
        entite: id
      }
      // console.log(data);
      this.crud.createIndic(data, this.id).subscribe((d:any) => {
        // console.log(d);
        if (d.message) {
          this.recupDatas()
          Swal.fire({
            title: "Succes!",
            text: d.message,
            icon: "success"
          });
        }else if(d.error){
          Swal.fire({
            title: "Error!",
            text: d.error,
            icon: "error"
          });
        }
      })
    }else if (this.op=='update') {
      // console.log(this.idIndic);

      let data = {
        libelle: this.modal.value.libelle,
        formule: this.modal.value.formule,
        entite: this.modal.value.entite
      }
      // console.log(data);
      this.crud.updateIndic(data, this.id, this.idIndic).subscribe((d:any) => {
        console.log(d);
        if (d.message) {
          this.recupDatas()
          Swal.fire({
            title: "Succes!",
            text: d.message,
            icon: "success"
          });
        }else if(d.error){
          Swal.fire({
            title: "Error!",
            text: d.error,
            icon: "error"
          });
        }
      })
    }

    const modal = document.getElementById("indic");
    if (modal) {
      modal.style.display = "none";
      this.modal.reset();
    }
  }

  addIndic()
  {
    const modal = document.getElementById("indic");
    if (modal) {
      modal.style.display = "block";
      this.titre = "Nouveau Indicateur"
      this.op = 'add'
    }
  }

  infoIndic(entity: any, indic: any)
  {
    // console.log(entity, indic.indicateur);
    const modal = document.getElementById("indic");
    if (modal) {
      modal.style.display = "block";
      this.titre = "Informations Indicateur"
      this.op = 'infos'

      this.modal.get('libelle')?.disable();
      this.modal.get('formule')?.disable();
      this.modal.get('entite')?.disable();

      this.modal.patchValue({
        libelle: indic.indicateur.libelle,
        formule: indic.indicateur.formule,
        entite: entity.sigle
      });
    }
  }

  editIndic(data: any, indic: any) {
    this.id_entite = data.id
    this.idIndic = indic.id

    this.datas.forEach((element:any) => {
      if (element.id == this.id_entite) {
        this.ent = element.sigle
      }
    })

    this.modal.patchValue({
      libelle: indic.libelle,
      formule: indic.formule,
      entite: this.ent
    });

    const modal = document.getElementById("indic");
    if (modal) {
      modal.style.display = "block";
      this.titre = "Modification Indicateur"
      this.op = 'update'
    }
  }

  deleteIndic(id: number) {
    // console.log(id);
    Swal.fire({
        title: "Voulez-vous confirmer la suppression ?",
        showDenyButton: true,
        confirmButtonText: "Supprimer",
        denyButtonText: `Annuler`
      }).then((result) => {
        if (result.isConfirmed) {
          this.crud.deleteIndic(this.id, id).subscribe((d:any)=>
          {
            if (d.message) {
              this.recupDatas()
              Swal.fire({
                title: "Succes!",
                text: d.message,
                icon: "success"
              });
            }else if(d.error){
              // console.log(d.error);
              Swal.fire({
                title: "Error!",
                text: d.error,
                icon: "error"
              });
            }
          })
        }else if (result.isDenied) {
              Swal.fire("La suppression a été annulée", "", "info");
            }
      });
  }

  close() {
    const modal = document.getElementById("indic");
    if (modal) {
      modal.style.display = "none";
      this.modal.get('libelle')?.enable();
      this.modal.get('formule')?.enable();
      this.modal.get('entite')?.enable();
    }
  }


}
