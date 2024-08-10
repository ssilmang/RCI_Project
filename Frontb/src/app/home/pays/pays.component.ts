import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Contry } from '../../_helpers/interfaces/data';
import { PaysService } from '../../_helpers/services/all_methods/pays.service';
import { ContryService } from '../../_helpers/services/all_methods/contry.service';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-pays',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule ],
  templateUrl: './pays.component.html',
  styleUrl: './pays.component.css'
})
export class PaysComponent {
  titre!: string
  btn!: string
  id!: number | null
  display: boolean = false
  // risk!: boolean
  // archive!: boolean

  contries: Signal<Contry[]> = signal([])
  // archives: Signal<Contry[]> = signal([])

  countryForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private contryService: ContryService
  ){
    this.countryForm = this.fb.group({
      libelle: this.fb.control("")
    })
  }

  ngOnInit()
  {
    this.getContries()

    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    const profil = userObj.profil_id
    // console.log(profil);
    if (profil == 2) {
      this.display = true
    }
  }

  getContries()
  {
    this.contryService.listResources().subscribe((res:any) => {
      this.contries = signal(res.data)
      // console.log(res);
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
      this.countryForm.reset()
    }
  }

  addOrUpLand()
  {
    if (this.btn == 'Ajouter') {
      this.contryService.addResources(this.countryForm.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getContries()
          this.countryForm.reset()
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
      this.contryService.updateResources(this.id, this.countryForm.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getContries()
          this.countryForm.reset()
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
      this.titre = 'Modification pays'
      this.btn = 'Modifier'
      this.id = land.id
      this.countryForm.patchValue({
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
        this.contryService.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getContries()
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
