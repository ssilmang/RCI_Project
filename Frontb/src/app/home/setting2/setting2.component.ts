import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartementService } from '../../_helpers/services/all_methods/departement.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'
import { Activite, Departement, Direction, Pole, Service } from '../../_helpers/interfaces/data';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { PoleService } from '../../_helpers/services/all_methods/pole.service';
import { DirectionPipe } from '../../_helpers/pipes/direction.pipe';
import { PolePipe } from '../../_helpers/pipes/pole.pipe';
import { ServiceService } from '../../_helpers/services/all_methods/service.service';
import { ActiviteService } from '../../_helpers/services/all_methods/activite.service';
import { DepartementPipe } from '../../_helpers/pipes/departement.pipe';
import { ServicePipe } from '../../_helpers/pipes/service.pipe';


@Component({
  selector: 'app-setting2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module, DirectionPipe, PolePipe, DepartementPipe, ServicePipe],
  templateUrl: './setting2.component.html',
  styleUrl: './setting2.component.css'
})
export class Setting2Component {

  display: boolean = true;
  service: boolean = true
  activite: boolean = false
  button!: string
  title!: string
  button2!: string
  title2!: string
  button3!: string
  title3!: string
  idDepart!: number | null
  selectedDirect: number | null = 0
  selectedPole: number | null = 0
  selectedDepart: number | null = 0
  selectedServ: number | null = 0
  idServ!: number | null
  idAct!: number | null


  directions: Signal<Direction[]> = signal([])
  poles: Signal<Pole[]> = signal([])
  departements: Signal<Departement[]> = signal([])
  services: Signal<Service[]> = signal([])
  activites: Signal<Activite[]> = signal([])


  Departement!: FormGroup
  Service!: FormGroup
  Activite!: FormGroup
  select!: FormGroup
  select2!: FormGroup
  select3!: FormGroup

  constructor(
    private fb: FormBuilder,
    private depart: DepartementService,
    private dirService: DirectionService,
    private poleService: PoleService,
    private servService: ServiceService,
    private actService: ActiviteService,

  )
  {
    this.Departement=this.fb.group({
      libelle: this.fb.control(""),
      direction_id: this.fb.control(0),
      pole_id: this.fb.control(0),
    });

    this.Service=this.fb.group({
      libelle: this.fb.control(""),
      departement_id: this.fb.control(0),
    });

    this.Activite=this.fb.group({
      libelle: this.fb.control(""),
      service_id: this.fb.control(0),
    });

    this.select=this.fb.group({
      direction_id: this.fb.control("0"),
      pole_id: this.fb.control("0"),
    });

    this.select2=this.fb.group({
      departement_id: this.fb.control("0"),
    });

    this.select3=this.fb.group({
      service_id: this.fb.control("0"),
    });

    this.select.get('direction_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedDirect = res
    })

    this.select.get('pole_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedPole = res
    })

    this.select2.get('departement_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedDepart = res
    })

    this.select3.get('service_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedServ = res
    })

  }

  ngOnInit()
  {
    this.getDepart()
    this.getDirections()
    this.getPoles()
    this.getActivites()
    this.getServices()
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

  addOrUpDept()
  {
    if (this.button == 'Ajouter') {
    // console.log(this.direction.value);
      this.depart.addResources(this.Departement.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getDepart()
          this.Departement.reset()
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
    }else if(this.button == 'Modifier'){
      this.depart.updateResources(this.idDepart, this.Departement.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getDepart()
          this.Departement.reset()
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
    }
  }

  addOrUpServ(){
    // console.log(this.Service.value);
    if (this.button2 == 'Ajouter') {
    // console.log(this.direction.value);
      this.servService.addResources(this.Service.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getServices()
          this.Service.reset()
          this.closeModal2()
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
    }else if(this.button2 == 'Modifier'){
      this.servService.updateResources(this.idServ, this.Service.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getServices()
          this.Service.reset()
          this.closeModal2()
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
  }

  addOrUpAct()
  {
    // console.log(this.Activite.value);
    if (this.button3 == 'Ajouter') {
    // console.log(this.direction.value);
      this.actService.addResources(this.Activite.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getActivites()
          this.Activite.reset()
          this.closeModal3()
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
    }else if(this.button3 == 'Modifier'){
      this.actService.updateResources(this.idAct, this.Activite.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getActivites()
          this.Activite.reset()
          this.closeModal3()
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
  }

  selectActivite()
  {
    this.activite = true;
    this.service = false
  }

  selectService()
  {
    this.activite = false;
    this.service = true
  }

  openModal()
  {
    let modal = document.getElementById('departement');
    if (modal) {
      this.title = 'Nouveau departement'
      this.button = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal(departement: any)
  {
    let modal = document.getElementById('departement');
    if (modal) {
      this.title = 'Modification departement'
      this.button = 'Modifier'
      this.idDepart = departement.id
      this.Departement.patchValue({
        libelle: departement.libelle,
        direction_id: departement.direction_id,
        pole_id: departement.pole_id
      })
      modal.style.display = 'block';
    }
  }

  deleteDepart(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.depart.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getDepart()
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
    let modal = document.getElementById('departement');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openModal2()
  {
    let modal = document.getElementById('service');
    if (modal) {
      this.title2 = 'Nouveau service'
      this.button2 = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal2(service: any)
  {
    let modal = document.getElementById('service');
    if (modal) {
      this.title2 = 'Modification service'
      this.button2 = 'Modifier'
      this.idServ = service.id
      this.Service.patchValue({
        libelle: service.libelle,
        departement_id: service.departement_id
      })
      modal.style.display = 'block';
    }
  }

  deleteServ(id: number|null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.servService.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getServices()
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

  closeModal2()
  {
    let modal = document.getElementById('service');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openModal3()
  {
    let modal = document.getElementById('activite');
    if (modal) {
      this.title3 = 'Nouveau activite'
      this.button3 = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal3(activite: any)
  {
    let modal = document.getElementById('activite');
    if (modal) {
      this.title3 = 'Modification activite'
      this.button3 = 'Modifier'
      this.idAct = activite.id
      this.Activite.patchValue({
        libelle: activite.libelle,
        service_id: activite.service_id
      })
      modal.style.display = 'block';
    }
  }

  deleteAct(id: number|null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.actService.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getActivites()
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

  closeModal3()
  {
    let modal = document.getElementById('activite');
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
