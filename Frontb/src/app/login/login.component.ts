import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Direction, Service } from '../_helpers/interfaces/data';
import { DirectionService } from '../_helpers/services/all_methods/direction.service';
import { ServiceService } from '../_helpers/services/all_methods/service.service';
import { UtilisateurService } from '../_helpers/services/all_methods/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  services: Signal<Service[]> = signal([])
  directions: Signal<Direction[]> = signal([])

  utilisateur!: FormGroup
  loginForm!: FormGroup;
  // resetForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UtilisateurService,
    private servService: ServiceService,
    private dirService: DirectionService
  )
  {
    this.loginForm = fb.group({
      matricule: ['Stg_ndao80021'],
      password: ['elzondao']
    })

    this.utilisateur = this.fb.group({
      nom_complet: this.fb.control("Elhadji Malick Ndao"),
      telephone: this.fb.control("783845870"),
      addresse: this.fb.control("Grand Yoff"),
      matricule: this.fb.control("17UUD"),
      email: this.fb.control("ndaoelhadji973@gmail.com"),
      password: this.fb.control("elzondao"),
      direction_id: this.fb.control(0),
      service_id: this.fb.control(0),
    });

    // this.resetForm = fb.group({
    //   email: ['']
    // })
  }

  ngOnInit()
  {
    this.getServices()
    this.getDirections()
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

  login()
  {
    this.router.navigateByUrl('/accueil/utilisateurs')
    // const data = this.loginForm.value;
    // console.log(data);
    // let user = { 'name': 'Elzo Ndao', 'role': 'admin' }
    // localStorage.setItem('user', JSON.stringify(user));
    // this.auth.setAccessToken('token');
    // this.auth.login(data).subscribe((d:any) => {
    //   // console.log(res);
    //   if (d.message) {
    //     this.router.navigateByUrl('/dashboard/accueil');
    //     localStorage.setItem('user', JSON.stringify(d.user));
    //     localStorage.setItem('token', JSON.stringify(d.token));
    //     Swal.fire({
    //       title: "Succes!",
    //       text: d.message + d.user.nom_complet +' !',
    //       icon: "success"
    //     });
    //   }else if(d.error){
    //     // console.log(d.error);
    //     this.router.navigateByUrl('/login');
    //     Swal.fire({
    //       title: "Error!",
    //       text: d.error,
    //       icon: "error"
    //     });
    //   }
    // })
  }

  addUser()
  {
    this.userService.addResources(this.utilisateur.value).subscribe((d:any)=>{
        // console.log(d);
      if (d.message) {
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

  register()
  {
    let modal = document.getElementById('register')
    if (modal) {
      modal.style.display = 'block'
    }
  }

  closeModal2()
  {
    let modal = document.getElementById('register')
    if (modal) {
      modal.style.display = 'none'
    }
  }

  reset()
  {
    // console.log(this.resetForm.value);
    this.closeModal()
  }

  newPassword()
  {
    let modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'block'
    }
  }

  closeModal()
  {
    let modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none'
    }
  }

}
