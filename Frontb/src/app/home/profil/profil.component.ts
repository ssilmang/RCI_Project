import { Component, Signal, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Profil } from '../../_helpers/interfaces/data';
// import { ProfilService } from '../../_helpers/services/all_methods/pays.service';
// import { ContryService } from '../../_helpers/services/all_methods/contry.service';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProfilService } from '../../_helpers/services/profil.service';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  titre!: string
  btn!: string
  id!: number | null
  profilForm!:FormGroup;
  profils: Signal<Profil[]> = signal([])
  // archives: Signal<Contry[]> = signal([])

  constructor(
    private fb: FormBuilder,
    private profilService: ProfilService
  ){
    this.profilForm = this.fb.group({
      libelle: this.fb.control("")
    })
  }

  openModal()
  {
    let modal = document.getElementById('land');
    if (modal) {
      this.titre = 'Nouveau Pays'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }
  
  closeModal()
  {
    let modal = document.getElementById('land');
    if (modal) {
      modal.style.display = 'none';
      this.profilForm.reset()
    }
  }

 

  ngOnInit()
  {
    this.getProfil()
  }

  getProfil()
  {
    this.profilService.listResources().subscribe((res:any) => {
      this. profils = signal(res.data)
      console.log(res);
    })
  }

  
  addOrUpLand()
  {
    if (this.btn == 'Ajouter') {
      this.profilService.addResources(this.profilForm.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getProfil()
          this.profilForm.reset()
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
      this.profilService.updateResources(this.id, this.profilForm.value).subscribe((d:any)=>{
       
        if (d.message) {
          this.getProfil()
          this.profilForm.reset()
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

  edit(land: any)
  {
    let modal = document.getElementById('land');
    if (modal) {
      this.titre = 'Modification profil'
      this.btn = 'Modifier'
      this.id = land.id
      this.profilForm.patchValue({
        libelle: land.libelle
      })
      modal.style.display = 'block';
    }
  }

  deleted(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer l'archivage ?",
      showDenyButton: true,
      confirmButtonText: "Archiver",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.profilService.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getProfil()
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



}





  
