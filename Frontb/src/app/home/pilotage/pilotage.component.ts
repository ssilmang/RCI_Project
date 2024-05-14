import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataService } from '../../_helpers/services/all_methods/data.service';
import { Activite, Controle, Data, Departement, Direction, Pole, Service, Utilisateur } from '../../_helpers/interfaces/data';
import { ControleService } from '../../_helpers/services/all_methods/controle.service';
import { DepartementService } from '../../_helpers/services/all_methods/departement.service';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { PoleService } from '../../_helpers/services/all_methods/pole.service';
import { ServiceService } from '../../_helpers/services/all_methods/service.service';
import { ActiviteService } from '../../_helpers/services/all_methods/activite.service';
import { UtilisateurService } from '../../_helpers/services/all_methods/utilisateur.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-pilotage',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule],
  templateUrl: './pilotage.component.html',
  styleUrl: './pilotage.component.css'
})
export class PilotageComponent {

  title: string = 'Nouveau control'
  btn: string = 'Ajouter'
  ctrls: Controle[] = [];
  id!: number | null

  datas: Signal<Data[]> = signal([])
  controles: Signal<Controle[]> = signal([])
  directions: Signal<Direction[]> = signal([])
  poles: Signal<Pole[]> = signal([])
  departements: Signal<Departement[]> = signal([])
  services: Signal<Service[]> = signal([])
  activites: Signal<Activite[]> = signal([])
  users: Signal<Utilisateur[]> = signal([])

  Data!: FormGroup

  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private ctrl: ControleService,
    private depart: DepartementService,
    private dirService: DirectionService,
    private poleService: PoleService,
    private servService: ServiceService,
    private actService: ActiviteService,
    private userService: UtilisateurService,
  ) {
    this.Data = this.fb.group({
      controle_id: this.fb.control(0),
      direction_id: this.fb.control(1),
      pole_id: this.fb.control(1),
      departement_id: this.fb.control(1),
      service_id: this.fb.control(1),
      activite_id: this.fb.control(1),
      code: this.fb.control(''),
      objectif: this.fb.control('O1'),
      risque_couvert: this.fb.control('R1'),
      user_id: this.fb.control(1),
      periodicite: this.fb.control('saisir la périodicité'),
      exhaustivite: this.fb.control(1),
      preuve: this.fb.control('P1'),
      fichier: this.fb.control('')
    })

    this.Data.get('controle_id')?.valueChanges.subscribe((d)=>{
      let code = this.ctrls.filter((c:any) => c.id == d)[0]
      this.Data.patchValue({code: code.code})
    })
  }

  ngOnInit() {
    this.getData()
    this.getControles()
    this.getDepart()
    this.getDirections()
    this.getPoles()
    this.getActivites()
    this.getServices()
    this.getUsers()
  }

  getUsers()
  {
    this.userService.listResources().subscribe((res:any) => {
      this.users = signal(res.data)
      // console.log(res.data);
    })
  }

  getData()
  {
    this.data.listResources().subscribe((res:any)=>{
      this.datas = signal(res.data);
      console.log(res.data);
    })
  }

  getPoles()
  {
    this.poleService.listResources().subscribe(r => {
      this.poles = signal(r)
    })
  }

  getServices()
  {
    this.servService.listResources().subscribe(r => {
      this.services = signal(r)
      // console.log(r);
    })
  }

  getActivites()
  {
    this.actService.listResources().subscribe(r => {
      this.activites = signal(r)
    })
  }

  getDirections()
  {
    this.dirService.listResources().subscribe(r => {
      this.directions = signal(r)
    })
  }

  getDepart()
  {
    this.depart.listResources().subscribe(r => {
      this.departements = signal(r)
      // console.log(r);
    })
  }

  getControles()
  {
    this.ctrl.listResources().subscribe((r:any) => {
      this.controles = signal(r.controles)
      this.ctrls = r.controles
      // console.log(r.controles);
    })
  }


  addOrUp()
  {
    // console.log(this.Data.value);
    if (this.btn == 'Ajouter') {
      this.data.addResources(this.Data.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getData()
          this.Data.reset()
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
      this.data.updateResources(this.id, this.Data.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getData()
          this.Data.reset()
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
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Nouveau control'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal(data: any)
  {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Modification control'
      this.btn = 'Modifier'
      this.id = data.id
      this.Data.patchValue({
        controle_id: data.controle_id.id,
        direction_id: data.direction_id.id,
        pole_id: data.pole_id.id,
        departement_id: data.departement_id.id,
        service_id: data.service_id.id,
        activite_id: data.activite_id.id,
        code: data.code,
        objectif: data.objectif,
        risque_couvert: data.risque_couvert,
        user_id: data.user_id.id,
        periodicite: data.periodicite,
        exhaustivite: data.exhaustivite,
        preuve: data.preuve,
        fichier: data.fichier
      })
      modal.style.display = 'block';
    }
  }

  info(data: any)
  {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Information control'
      this.btn = 'Fermer'
      this.Data.patchValue({
        controle_id: data.controle_id.id,
        direction_id: data.direction_id.id,
        pole_id: data.pole_id.id,
        departement_id: data.departement_id.id,
        service_id: data.service_id.id,
        activite_id: data.activite_id.id,
        code: data.code,
        objectif: data.objectif,
        risque_couvert: data.risque_couvert,
        user_id: data.user_id.id,
        periodicite: data.periodicite,
        exhaustivite: data.exhaustivite,
        preuve: data.preuve,
        fichier: data.fichier
      })
      this.Data.disable()
      modal.style.display = 'block';
    }
  }

  deleteD(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer l'archivage ?",
      showDenyButton: true,
      confirmButtonText: "Archiver",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getData()
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

  closeModal()
  {
    let modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
      this.Data.enable()
    }
  }

}
