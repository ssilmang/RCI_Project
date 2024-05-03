import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CrudService } from 'src/app/dashboard/shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-entite',
  templateUrl: './entite.component.html',
  styleUrls: ['./entite.component.css']
})
export class EntiteComponent {

  title!: string
  titre!: string
  op: string = 'add'
  stat!: string
  selectedItem: any;
  entity!: string;
  sigle!: string;
  entityToUp!: string
  formule!: string
  indicateur!: string
  indicateurToUp!: string
  newIndic!: string
  id_entite!: number
  entite_id!: number
  id_indic!: number
  actif:boolean = true
  display: boolean = true
  id!: number

  modal!: FormGroup
  modalIndic!: FormGroup
  modalIndic2!: FormGroup

  datas:any = []

  indic: any =
  {
    'entite': 'Entité | Indicateurs',
    'indicateurs':[],
  }

  constructor(private crud: CrudService, private fb: FormBuilder, private toastr: ToastrService){
    this.modal = this.fb.group({
      libelle: [''],
      sigle: ['']
    })

    this.modalIndic = this.fb.group({
      libelle: [''],
      formule: ['']
    })

    this.modalIndic2 = this.fb.group({
      libelle: [''],
      formule: ['']
    })
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

    let selectedEntite = localStorage.getItem('selectedEntity');
    if (selectedEntite) {
      this.selectedItem = JSON.parse(selectedEntite)
    }

    let selectedEntityIndic = localStorage.getItem('selectedEntityIndic');
    if (selectedEntityIndic) {
        let selectedEntity = JSON.parse(selectedEntityIndic);
        if (selectedEntity.indicateurs && selectedEntity.indicateurs.length > 0) {
            this.indic = selectedEntity;
        }
    }

  }

  recupDatas()
  {
    this.crud.getIndicEntity().subscribe((indic:any) =>{
      this.datas = indic.data
      // console.log(this.datas);
    })
  }

  modalEntity()
  {
    const modal = document.getElementById("entite");
    if (modal) {
      modal.style.display = "block";
      this.title = "NOUVELLE ENTITE"
      this.op = 'add'
    }
  }

  addorUpEntity() {
    // console.log(this.modal.value);
    if (this.op=='add') {
      this.crud.createEntite(this.modal.value).subscribe((d:any) => {
        // console.log(d);
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
        // if (d.status=='success') {
        //   console.log(d.message);
        //   this.recupDatas()
        //   this.toastr.success('Entité créé avec succès !!');

        // }
      })
    }else if (this.op=='update') {
      this.crud.updateEntite(this.modal.value, this.id, this.id_entite).subscribe((d:any) => {
        // console.log(d);
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
    }

    this.modal.reset();
    const modal = document.getElementById("entite");
    if (modal) {
      modal.style.display = "none";
    }

  }

  closeMod()
  {
    const modal = document.getElementById("entite");
    if (modal) {
      modal.style.display = "none";
    }
  }

  editEntity(entity: any) {
    // console.log(entity);
    this.id_entite = entity.id

    this.modal.patchValue({
      libelle: entity.libelle,
      sigle: entity.sigle,
    });

    const modal = document.getElementById("entite");
    if (modal) {
      modal.style.display = "block";
      this.title = "MODIFICATION ENTITE"
      this.op = 'update'
    }
  }

  deleteEntity(id: number)
  {
    // console.log(id);
    this.crud.deleteEntity(this.id, id).subscribe((d:any)=>
    {
      console.log(d.message);
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
  }

  displayIndic(data: any)
  {
    // console.log(data);
    this.indic = data
    // console.log(this.indic);
    this.entite_id = this.indic.id
    this.selectedItem = this.indic.id;
    localStorage.setItem('selectedEntityIndic', JSON.stringify(this.indic))
    localStorage.setItem('selectedEntity', JSON.stringify(this.selectedItem))
    //console.log(this.selectedItem);

    if (data.indicateurs.length == 0){this.newIndic = 'new'}
    // console.log(this.newIndic);
  }

  addIndic()
  {
    const modal = document.getElementById("indic");
    if (modal) {
      modal.style.display = "block";
      this.titre = "Nouveau Indicateur"
      this.stat = 'add'
    }
  }

  close() {
    this.modalIndic.reset()
    const modal = document.getElementById("indic");
    if (modal) {
      modal.style.display = "none";
    }
  }

  closeInd() {
    const modal = document.getElementById("ind");
    if (modal) {
      modal.style.display = "none";
      this.modalIndic2.get('libelle')?.enable();
      this.modalIndic2.get('formule')?.enable();
    }
  }

  openIndicModal(indic: any)
  {
    this.modalIndic2.patchValue({
      libelle: indic.libelle,
      formule: indic.formule,
    });
    const modal = document.getElementById("ind");
    if (modal) {
      modal.style.display = "block";
      this.modalIndic2.get('libelle')?.disable();
      this.modalIndic2.get('formule')?.disable();
    }
  }

  editIndic(indic: any) {
    // console.log(indic);
    this.id_indic = indic.id
    this.modalIndic.patchValue({
      libelle: indic.libelle,
      formule: indic.formule,
    });

    const modal = document.getElementById("indic");
    if (modal) {
      modal.style.display = "block";
      this.titre = "Mise à Jour Indicateur"
      this.stat = 'mod'
    }
  }

  addOrUpIndic()
  {
    // console.log(this.modalIndic.value, this.entite_id);
    if (this.stat=='add') {
      let data = {
          libelle: this.modalIndic.value.libelle,
          formule: this.modalIndic.value.formule,
          entite: this.entite_id
        }
        // console.log(data);
        this.crud.createIndic(data, this.id).subscribe((d:any) => {
            if (d.message) {
              this.updataIndics()
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
    }else if(this.stat=='mod'){
      // console.log(this.modalIndic.value);
      let data = {
        libelle: this.modalIndic.value.libelle,
        formule: this.modalIndic.value.formule,
        entite_id: this.entite_id
      }
      // console.log(data, this.id_indic);
      this.crud.upIndic(data, this.id, this.id_indic).subscribe((d:any) => {
        // console.log(d);
        if (d.message) {
          this.updataIndics()
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
    }
    this.modalIndic.reset()
  }

  deleteIndic(item: any)
  {
    Swal.fire({
        title: "Voulez-vous confirmer la suppression ?",
        showDenyButton: true,
        confirmButtonText: "Supprimer",
        denyButtonText: `Annuler`
      }).then((result) => {
        if (result.isConfirmed) {
          this.crud.deleteIndic(this.id, item.id).subscribe((d:any)=>{
          // console.log(d.message);
            if (d.message) {
              this.updataIndics()
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

  updataIndics()
  {
    this.crud.getIndicEntity().subscribe((indic:any) =>{
      this.indic.indicateurs = indic.data.filter((d:any)=> d.id == this.entite_id)[0].indicateurs
      this.newIndic = 'new'
    })
  }

}
