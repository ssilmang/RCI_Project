import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { Risque } from '../../_helpers/interfaces/data';
import { RisqueService } from '../../_helpers/services/all_methods/risque.service';


@Component({
  selector: 'app-risque',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule],
  templateUrl: './risque.component.html',
  styleUrl: './risque.component.css'
})
export class RisqueComponent {

  titre!: string
  btn!: string
  id!: number | null
  risk!: boolean
  archive!: boolean
  display: boolean = false

  risque!: FormGroup

  risques: Signal<Risque[]> = signal([])
  archives: Signal<Risque[]> = signal([])

  constructor(private fb: FormBuilder, private riskk: RisqueService)
  {
    this.risque = this.fb.group({
      libelle: this.fb.control("Risque 1")
    })
  }

  ngOnInit()
  {
    this.selectRisk()
    this.getRisques()

    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    const profil = userObj.profil_id
    // console.log(profil);
    if (profil == 2) {
      this.display = true
    }
  }

  getRisques()
  {
    this.riskk.listResources().subscribe((r:any) => {
      this.risques = signal(r.risques)
      this.archives = signal(r.archives)
      // console.log(r);
    })
  }

  selectRisk()
  {
    this.risk = true;
    this.archive = false
  }

  selectArchive()
  {
    this.risk = false;
    this.archive = true
  }

  openModal()
  {
    let modal = document.getElementById('risk');
    if (modal) {
      this.titre = 'Nouvelle risque'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('risk');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  addOrUpRisk()
  {
    if (this.btn == 'Ajouter') {
      this.riskk.addResources(this.risque.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getRisques()
          this.risque.reset()
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
      this.riskk.updateResources(this.id, this.risque.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getRisques()
          this.risque.reset()
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

  editModal(risk: any)
  {
    let modal = document.getElementById('risk');
    if (modal) {
      this.titre = 'Modification risque'
      this.btn = 'Modifier'
      this.id = risk.id
      this.risque.patchValue({
        libelle: risk.libelle
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
        this.riskk.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getRisques()
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
        this.riskk.restaureResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getRisques()
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
