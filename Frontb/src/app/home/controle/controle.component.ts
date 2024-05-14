import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ControleService } from '../../_helpers/services/all_methods/controle.service';
import { Controle } from '../../_helpers/interfaces/data';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, ],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css'
})
export class ControleComponent {

  titre!: string
  btn!: string
  id!: number | null
  controles: Signal<Controle[]> = signal([])

  controle!: FormGroup


  constructor(private fb: FormBuilder, private ctrl: ControleService)
  {
    this.controle=this.fb.group({
      nom: this.fb.control("Controle 1"),
      code: this.fb.control("C1"),
    });
  }

  ngOnInit()
  {
    this.getControles()
  }

  getControles()
  {
    this.ctrl.listResources().subscribe(r => {
      this.controles = signal(r)
      // console.log(r);
    })
  }

  addOrUpCtrl()
  {
    // console.log(this.controle.value);
    if (this.btn == 'Ajouter') {
      this.ctrl.addResources(this.controle.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getControles()
          this.controle.reset()
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
      this.ctrl.updateResources(this.id, this.controle.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getControles()
          this.controle.reset()
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

  openModal()
  {
    let modal = document.getElementById('controle');
    if (modal) {
      this.titre = 'Nouveau controle'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  info(ctrl: any)
  {
    let modal = document.getElementById('controle');
    if (modal) {
      this.titre = 'Information controle'
      this.btn = 'Fermer'
      this.controle.patchValue({
        nom: ctrl.nom,
        code: ctrl.code
      })
      modal.style.display = 'block';
    }
  }

  editModal(ctrl: any)
  {
    let modal = document.getElementById('controle');
    if (modal) {
      this.titre = 'Modification controle'
      this.btn = 'Modifier'
      this.id = ctrl.id
      this.controle.patchValue({
        nom: ctrl.nom,
        code: ctrl.code
      })
      modal.style.display = 'block';
    }
  }

  deleteCtrl(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.ctrl.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getControles()
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
        Swal.fire("La suppression a été annulée", "", "info");
      }
    });
  }

  closeModal()
  {
    let modal = document.getElementById('controle');
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
