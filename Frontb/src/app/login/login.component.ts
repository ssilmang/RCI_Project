import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Contry, Direction, Profil, Service } from '../_helpers/interfaces/data';
import { DirectionService } from '../_helpers/services/all_methods/direction.service';
import { ServiceService } from '../_helpers/services/all_methods/service.service';
import { UtilisateurService } from '../_helpers/services/all_methods/utilisateur.service';
import Swal from 'sweetalert2';
import { ContryService } from '../_helpers/services/all_methods/contry.service';
import { ProfilService } from '../_helpers/services/profil.service';
import { AuthService } from '../_helpers/services/auth.service';


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
  contries: Signal<Contry[]> = signal([])
  profils: Signal<Profil[]> = signal([])

  utilisateur!: FormGroup
  loginForm!: FormGroup;
  // resetForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UtilisateurService,
    private servService: ServiceService,
    private dirService: DirectionService,
    private contryService: ContryService,
    private profilService: ProfilService,
    private authService: AuthService
  )
  {
    this.loginForm = fb.group({
      email: ['ndaoelhadji973@gmail.com'],
      password: ['elzondao']
    })

    this.utilisateur = this.fb.group({
      nom_complet: this.fb.control(""),
      telephone: this.fb.control(""),
      addresse: this.fb.control(""),
      matricule: this.fb.control(""),
      email: this.fb.control(""),
      password: this.fb.control(""),
      direction_id: this.fb.control(0),
      service_id: this.fb.control(0),
      pays_id: this.fb.control(0),
      profil_id: this.fb.control(0),
    });

    // this.resetForm = fb.group({
    //   email: ['']
    // })
  }

  ngOnInit()
  {
    this.getServices()
    this.getDirections()
    this.getContries()
    this.getProfil()
  }

  getProfil() {
    this.profilService.listResources().subscribe(
      (res: any) => {
        this.profils = signal(res)
        // console.log(res);
      },
      (error: any) => {
        console.error('Error fetching profils:', error);
      }
    );
  }

  getContries()
  {
    this.contryService.listResources().subscribe((res:any) => {
      this.contries = signal(res.data)
      // console.log(res);
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

  login()
  {
    // this.router.navigateByUrl('/accueil')
    const data = this.loginForm.value;
    // console.log(data);
    this.authService.login(data.email, data.password).subscribe(
      data => {
        // console.log('Login successful', data);
        this.router.navigateByUrl('/accueil/pilotage');
        Swal.fire({
          title: "Succes!",
          text: 'Bienvenue ' + data.user.nom_complet + ' !',
          icon: "success"
        });
      },
      error => {
        console.error('Login failed', error);
         Swal.fire({
          title: "error!",
          text: 'La connexion a échouée !',
          icon: "error"
        });
      }
    );

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
      this.utilisateur.reset()
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
