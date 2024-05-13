import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurService } from '../../_helpers/services/all_methods/utilisateur.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'
import { Utilisateur } from '../../_helpers/interfaces/data';


@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {

  title!: string
  btn!: string
  users: Utilisateur[] = []

  utilisateur!: FormGroup

  constructor(private fb:FormBuilder, private userService: UtilisateurService) {
    this.utilisateur = this.fb.group({
      nom_complet: this.fb.control("Elhadji Malick Ndao"),
      telephone: this.fb.control("783845870"),
      adresse: this.fb.control("Grand Yoff"),
      matricule: this.fb.control("17UUD"),
      email: this.fb.control("ndaoelhadji973@gmail.com"),
      password: this.fb.control("elzondao"),
      direction_id: this.fb.control(0),
      service_id: this.fb.control(0),
    });
  }

  ngOnInit() {
    this.getUsers()
  }

  getUsers()
  {
    this.userService.listResources().subscribe(res => {
      this.users = res
      console.log(this.users);
    })
  }

  addOrUpUser()
  {
    if (this.btn=='Ajouter') {
      // this.userService.addResources(this.utilisateur.value).subscribe((d:any)=>{
      //   // console.log(d);
      //   if (d.message) {
      //     this.getUsers()
      // this.utilisateur.reset()
      //     Swal.fire({
      //       title: "Succes!",
      //       text: d.message,
      //       icon: "success"
      //     });
      //   }else if(d.error){
      //     Swal.fire({
      //       title: "Error!",
      //       text: d.error,
      //       icon: "error"
      //     });
      //   }
      // })
    }else if(this.btn=='Modifier'){
      // this.userService.updateResources(1, this.utilisateur.value).subscribe((d:any)=>{
      //   // console.log(d);
      //   if (d.message) {
      //     this.getUsers()
      //     this.utilisateur.reset()
      //     Swal.fire({
      //       title: "Succes!",
      //       text: d.message,
      //       icon: "success"
      //     });
      //   }else if(d.error){
      //     Swal.fire({
      //       title: "Error!",
      //       text: d.error,
      //       icon: "error"
      //     });
      //   }
      // })
    }
  }

  deleteModal()
  {
     Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteResource(1).subscribe((d:any) => {
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

  editModal()
  {
    let modal = document.getElementById('userModal');
    if (modal) {
      this.title = 'Modification utilisateur'
      this.btn = 'Modifier'
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('userModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


}
