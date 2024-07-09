import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ControleService } from '../../_helpers/services/all_methods/controle.service';
import { Activite, Controle, Data, Departement, Direction, Pole, Service, Utilisateur } from '../../_helpers/interfaces/data';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { TypeControle } from '../../_helpers/interfaces/data';
import { TypeService } from '../../_helpers/services/all_methods/type.service';
import { SearchCtrlPipe } from '../../_helpers/pipes/search-ctrl.pipe';
import { UtilisateurService } from '../../_helpers/services/all_methods/utilisateur.service';
import { DataService } from '../../_helpers/services/all_methods/data.service';


@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule, SearchCtrlPipe],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css'
})
export class ControleComponent {

  titre!: string
  btn!: string
  id!: number | null
  control: boolean = true
  archive: boolean = false
  ctrlToSearch!: string

  types: Signal<TypeControle[]> = signal([])
  controles: Signal<Controle[]> = signal([])
  archives: Signal<Controle[]> = signal([])
  directions: Signal<Direction[]> = signal([])
  poles: Signal<Pole[]> = signal([])
  departements: Signal<Departement[]> = signal([])
  services: Signal<Service[]> = signal([])
  activites: Signal<Activite[]> = signal([])
  users: Signal<Utilisateur[]> = signal([])
  datas: Signal<Data[]> = signal([])


  controle!: FormGroup
  searchForm!: FormGroup

  constructor(private fb: FormBuilder, private ctrl: ControleService, private type: TypeService, private userService: UtilisateurService, private data: DataService)
  {
    this.controle = this.fb.group({
      nom_controle: this.fb.control(''),
      code: this.fb.control(''),
      objectif: this.fb.control(''),
      descriptif: this.fb.control(''),
      type: this.fb.control(0),
      periodicite: this.fb.control(0),
      user_id: this.fb.control(0),
      preuve: this.fb.control('')
    })

    this.searchForm = this.fb.group({
      ctrl: this.fb.control('')
    })

    this.searchForm.get('ctrl')?.valueChanges.subscribe(data =>
      {
        this.ctrlToSearch = data
      }
    )
  }

  ngOnInit()
  {
    this.getTypes()
    this.getUsers()
    this.getData()
  }

  getData()
  {
    this.data.listResources().subscribe((res:any)=>{
      this.datas = signal(res.controles);
      console.log(res.controles)
    })
  }

  getTypes()
  {
    this.type.listResources().subscribe((r:any) => {
      this.types = signal(r.types)
      // console.log(r);
    })
  }

  getUsers()
  {
    this.userService.listResources().subscribe((res:any) => {
      this.users = signal(res.data)
      // console.log(res.data);
    })
  }

  getControles()
  {
    // this.ctrl.listResources().subscribe((r:any) => {
    //   this.controles = signal(r.data)
    //   this.archives = signal(r.archives)
    //   console.log(r.data);
    // })
  }

  info(ctrl: any)
  {
    let modal = document.getElementById('controle');
    if (modal) {
      this.titre = 'Information controle'
      this.btn = 'Fermer'
      this.controle.patchValue({
        nom_controle: ctrl.controle,
        code: ctrl.code,
        objectif: ctrl.objectif,
        descriptif: ctrl.descriptif,
        type: ctrl.type_controle_id.id,
        user_id: ctrl.user_id.id,
        periodicite: ctrl.periodicite,
        preuve: ctrl.preuve
      })
      this.controle.disable()
      modal.style.display = 'block';
    }
  }

  restaureCtrl(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la restauration ?",
      showDenyButton: true,
      confirmButtonText: "Restaurer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.ctrl.restaureResource(id).subscribe((d:any) => {
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
        Swal.fire("La restauration a été annulée", "", "info");
      }
    });
  }

  closeModal()
  {
    let modal = document.getElementById('controle');
    if (modal) {
      modal.style.display = 'none';
    }
    this.controle.enable()
  }

  selectControle()
  {
    this.control = true;
    this.archive = false
  }

  selectArchive()
  {
    this.control = false;
    this.archive = true
  }

  info2(ctrl: any)
  {
    let modal = document.getElementById('archive');
    if (modal) {
      this.titre = 'Information controle'
      this.btn = 'Fermer'
      this.controle.patchValue({
        nom_controle: ctrl.nom_controle,
        code: ctrl.code,
        objectif: ctrl.objectif,
        descriptif: ctrl.descriptif,
        type: ctrl.type_controle_id
      })
      this.controle.disable()
      modal.style.display = 'block';
    }
  }

  closeModal2()
  {
    let modal = document.getElementById('archive');
    if (modal) {
      modal.style.display = 'none';
    }

  }

}
