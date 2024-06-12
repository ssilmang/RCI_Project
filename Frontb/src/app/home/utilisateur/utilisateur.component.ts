import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../../_helpers/services/all_methods/utilisateur.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'
import { Direction, Service, Utilisateur } from '../../_helpers/interfaces/data';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { ServiceService } from '../../_helpers/services/all_methods/service.service';
import { DirectionPipe } from '../../_helpers/pipes/direction.pipe';
import { ServicePipe } from '../../_helpers/pipes/service.pipe';
import { Direction2Pipe } from '../../_helpers/pipes/direction2.pipe';
import { Service2Pipe } from '../../_helpers/pipes/service2.pipe';


@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SweetAlert2Module, Direction2Pipe, Service2Pipe],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {

  title!: string
  btn!: string
  id!: number | null
  selectedDir: number = 0
  selectedServ: number = 0

  users: Signal<Utilisateur[]> = signal([])
  services: Signal<Service[]> = signal([])
  directions: Signal<Direction[]> = signal([])

  utilisateur!: FormGroup
  select!: FormGroup


  constructor(
    private fb:FormBuilder,
    private userService: UtilisateurService,
    private servService: ServiceService,
    private dirService: DirectionService
  ) {
    this.utilisateur = this.fb.group({
      nom_complet: this.fb.control("Elhadji Malick Ndao"),
      telephone: this.fb.control("783845870"),
      addresse: this.fb.control("Grand Yoff"),
      matricule: this.fb.control("17UUD"),
      email: this.fb.control("ndaoelhadji973@gmail.com"),
      password: this.fb.control("elzondao"),
      direction_id: this.fb.control(0),
      service_id: this.fb.control(0),
      contry_id: this.fb.control(0),
    });

    this.select = this.fb.group({
      direction_id: this.fb.control(0),
      service_id: this.fb.control(0),
      contry_id: this.fb.control(0),
    });

    this.select.get('direction_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedDir = res
    })
    this.select.get('contry_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedDir = res
    })

    this.select.get('service_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedServ = res
    })
  }

  ngOnInit() {
    this.getUsers()
    this.getServices()
    this.getDirections()
  }

  getUsers()
  {
    this.userService.listResources().subscribe((res:any) => {
      this.users = signal(res.data)
      console.log(res.data);
    })
  }

  getDirections()
  {
    this.dirService.listResources().subscribe(r => {
      this.directions = signal(r)
    })
  }

  getServices()
  {
    this.servService.listResources().subscribe(r => {
      this.services = signal(r)
      // console.log(r);
    })
  }

  addOrUpUser()
  {
    if (this.btn=='Ajouter') {
      this.userService.addResources(this.utilisateur.value).subscribe((d:any)=>{
        // console.log(d);
      if (d.message) {
      this.getUsers()
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
    }else if(this.btn=='Modifier'){
      this.userService.updateResources(this.id, this.utilisateur.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getUsers()
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

  deleteModal(id: number | null)
  {
     Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getUsers()
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

  openModal()
  {
    let modal = document.getElementById('userModal');
    if (modal) {
      this.title = 'Nouveau utilisateur'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal(user: any)
  {
    // console.log(user);

    let modal = document.getElementById('userModal');
    if (modal) {
      this.title = 'Modification utilisateur'
      this.btn = 'Modifier'
      this.utilisateur.patchValue(
      {
        nom_complet: user.nom_complet,
        telephone: user.telephone,
        addresse: user.addresse,
        matricule: user.matricule,
        email: user.email,
        password: user.password,
        direction_id: user.direction_id.id,
        service_id: user.service_id.id,
      }
      )
      modal.style.display = 'block';
    }
  }

  info(user: any)
  {
    let modal = document.getElementById('userModal');
    if (modal) {
      this.title = 'Information utilisateur'
      this.btn = 'Fermer'
      this.utilisateur.patchValue(
      {
        nom_complet: user.nom_complet,
        telephone: user.telephone,
        addresse: user.addresse,
        matricule: user.matricule,
        email: user.email,
        password: user.password,
        direction_id: user.direction_id.id,
        service_id: user.service_id.id,
      }
      )
      this.utilisateur.disable()
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('userModal');
    if (modal) {
      this.utilisateur.reset()
      modal.style.display = 'none';
    }
  }

}
