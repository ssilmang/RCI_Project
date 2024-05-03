import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserEntitePipe } from 'src/app/dashboard/shared/pipes/user-entite.pipe';
import { UserProfilPipe } from 'src/app/dashboard/shared/pipes/user-profil.pipe';
import { DataService } from 'src/app/dashboard/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css'],
  providers: [UserEntitePipe, UserProfilPipe]
})
export class UtilisateurComponent  {
  formulaire!:FormGroup
  form!:FormGroup

  allusers:any;
  allEntite:any;
  users:any;
  id!: number
  profils:any;
  userId!:number
  role: number = 0
  entite: number = 0
  display: boolean = true
  indicateurs: any[] = [];
  useId!: number


  constructor(private apiService: DataService,private fb:FormBuilder,private toastr: ToastrService) {
    this.formulaire=this.fb.group({
      nom_complet: this.fb.control(""),
      matricule: this.fb.control(""),
      email: this.fb.control(""),
      identifiant: this.fb.control(""),
      role: this.fb.control(""),
      entite: this.fb.control("0"),
      password:this.fb.control(""),
    });

    this.form=this.fb.group({
      roles: this.fb.control("0"),
      entites: this.fb.control("0")
    });
  }

  ngOnInit() {
    this.getUsers();
    this.getEntite();

    this.apiService.getprofil().subscribe(data =>{
      this.profils = data
      // console.log(data);
      // this.fetchIndicateurs()
    })

    let userFromStorage = localStorage.getItem('user');
    let user = JSON.parse(userFromStorage!)
    this.id = user.id;
    if (user.profil_id.libelle=='Utilisateur') {
      this.display = false
    }else{
      this.display = true
    }

  }

  openAddModal() {
    const babaElement = document.getElementById('crud-modal');
    babaElement!.style.display = 'block';
  }

  closeddModal() {
    const babaElement = document.getElementById('crud-modal');
    babaElement!.style.display = 'none';
  }

  getUsers() {
    this.apiService.getUsers()
      .subscribe((users:any) => {
        this.allusers = users.data;
        // console.log(this.allusers );
      },
      error => {
        console.error('Error de recuperation users:', error);
      });
  }

  createUsers() {
    let user = this.formulaire.value;
    // console.log(user);

     this.apiService.createUser(user).subscribe((d:any) => {
        if (d.message) {
        // console.log(d.message);
            this.getUsers()
            Swal.fire({
              title: "Succes!",
              text: d.message,
              icon: "success"
            });
          }else if(d.error){
            // console.log(d.error);
            Swal.fire({
              title: "Error!",
              text: d.error,
              icon: "error"
            });
          }
    });
    this.formulaire.reset()
    const babaElement = document.getElementById('crud-modal');
    babaElement!.style.display = 'none';
  }

  updateUser() {
    this.apiService.updateUser(this.users.id).subscribe((d:any) => {
      if (d.message) {
        // console.log(d.message);
        this.getUsers()
        Swal.fire({
          title: "Succes!",
          text: d.message,
          icon: "success"
        });
      }else if(d.error){
        // console.log(d.error);
        Swal.fire({
          title: "Error!",
          text: d.error,
          icon: "error"
        });
      }
    });
  }

  getEntite() {
    this.apiService.allEntite()
      .subscribe(entite => {
        this.allEntite = entite;
        // console.log(this.allEntite);
      },
      error => {
        console.error('Error de recuperation users:', error);

      });
  }

  deleteUser(userId: number) {
    Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteuser(this.id, userId).subscribe((d:any) => {
            // console.log(d);
          if (d.message) {
            this.getUsers()
            Swal.fire({
              title: "Succes!",
              text: d.message,
              icon: "success"
            });
          }else if(d.error){
            // console.log(d.error);
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

  editUser(user: any) {
    // console.log(user.entite_id.id, user.profil_id.id);
    // console.log(this.form.value);
    if (user.profil_id.id != 1) {
      this.useId = user.id
      this.form.patchValue({
        roles: user.profil_id.id,
        entites: user.entite_id.id
      })

      let modal = document.getElementById("modal");
      if (modal) {
        modal.style.display = "block";
      }
    }else{
      Swal.fire({
        title: "Error!",
        text: "Vous ne pouvez pas editer un administrateur",
        icon: "error"
      });
    }

  }

  closeModal() {
    const babaElement = document.getElementById('modal');
    babaElement!.style.display = 'none';
  }

  upUser() {
    // console.log(this.id, this.useId);
    this.apiService.upUser(this.form.value, this.id, this.useId).subscribe((d:any) => {
      // console.log(d);
      if (d.message) {
        this.getUsers()
        this.closeModal()
        this.form.reset()
        Swal.fire({
          title: "Succes!",
          text: d.message,
          icon: "success"
        });
      }else if(d.error){
        // console.log(d.error);
        Swal.fire({
          title: "Error!",
          text: d.error,
          icon: "error"
        });
      }
    });

  }


}
