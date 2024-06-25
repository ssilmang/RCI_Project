import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { TypeControle } from '../../_helpers/interfaces/data';
import { TypeService } from '../../_helpers/services/all_methods/type.service';


@Component({
  selector: 'app-type-controle',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule],
  templateUrl: './type-controle.component.html',
  styleUrl: './type-controle.component.css'
})
export class TypeControleComponent {

  titre!: string
  btn!: string
  id!: number | null
  typ!: boolean
  archive!: boolean

  typeform!: FormGroup

  types: Signal<TypeControle[]> = signal([])
  archives: Signal<TypeControle[]> = signal([])

  constructor(private fb: FormBuilder, private type: TypeService)
  {
    this.typeform = this.fb.group({
      libelle: this.fb.control("")
    })
  }

  ngOnInit()
  {
    this.selectType()
    this.getTypes()
  }

  getTypes()
  {
    this.type.listResources().subscribe((r:any) => {
      this.types = signal(r.types)
      this.archives = signal(r.archives)
      console.log(r);
    })
  }

  selectType()
  {
    this.typ = true;
    this.archive = false
  }

  selectArchive()
  {
    this.typ = false;
    this.archive = true
  }

  openModal()
  {
    let modal = document.getElementById('type');
    if (modal) {
      this.titre = 'Nouveau type'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('type');
    if (modal) {
      modal.style.display = 'none';
      this.typeform.reset()
    }
  }

  addOrUpTyp()
  {
    if (this.btn == 'Ajouter') {
      this.type.addResources(this.typeform.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getTypes()
          this.typeform.reset()
          this.closeModal()
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
    }else if(this.btn == 'Modifier'){
      this.type.updateResources(this.id, this.typeform.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getTypes()
          this.typeform.reset()
          this.closeModal()
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
    }else{
      this.closeModal()
    }
  }

  editModal(type: any)
  {
    let modal = document.getElementById('type');
    if (modal) {
      this.titre = 'Modification type'
      this.btn = 'Modifier'
      this.id = type.id
      this.typeform.patchValue({
        libelle: type.libelle
      })
      modal.style.display = 'block';
    }
  }

  deleteRisk(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer l'archivage ?",
      showDenyButton: true,
      confirmButtonText: "Archiver",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.type.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getTypes()
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
        });
      }else if(result.isDenied) {
        Swal.fire("L'archivage a été annulée", "", "info");
      }
    });
  }

  unarchive(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la restauration ?",
      showDenyButton: true,
      confirmButtonText: "Restaurer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.type.restaureResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getTypes()
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
        });
      }else if(result.isDenied) {
        Swal.fire("La restauration a été annulée", "", "info");
      }
    });
  }

}
