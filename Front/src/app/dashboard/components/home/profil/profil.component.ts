import { Component } from '@angular/core';
import { DataService } from 'src/app/dashboard/shared/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  formulaire!: FormGroup
  allprofils:any[]=[]
  profil!:number;
  libelle:any
  btn: string = 'add'
  id!: number
  display: boolean = true


  constructor(private apiService: DataService,private fb:FormBuilder,private toastr: ToastrService) {
    this.formulaire = this.fb.group({
      libelle: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-ZÀ-ÿ\s]*$/)]],
    });
  }

  ngOnInit() {
    this.getprofil();

    let userFromStorage = localStorage.getItem('user');
    let user = JSON.parse(userFromStorage!)
    if (user.profil_id.libelle=='Utilisateur') {
      this.display = false
    }else{
      this.display = true
    }
  }

  getprofil()
  {
    this.apiService.getprofil()
      .subscribe(profil => {
        this.allprofils = profil;
        // console.log(profil);
      },
      error => {
        console.error('Error de recuperation users:', error);

      });

  }

  createprofil() {
    if (this.formulaire.valid) {
      if (this.btn=='add') {
        this.profil=this.formulaire.value
        this.apiService.createProfil(this.profil).subscribe((d:any) => {
          if (d.message) {
        // console.log(d.message);
            this.getprofil()
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
      }else if (this.btn=='update') {
        // console.log(this.formulaire.get('libelle')?.value);
        this.apiService.updateprofil(this.id, this.formulaire.get('libelle')?.value)
        .subscribe((d:any) => {
          if (d.message) {
            // console.log(d.message);
            this.getprofil()
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
        })
      }
      this.formulaire.reset()
      this.btn='add'
    }else{
      Swal.fire({
        title: "Error!",
        text: 'Le libellé doit commencer par une lettre majuscule et ne contient pas de caractères spéciales',
        icon: "error"
      });
    }
  }

  deleteProfil(userId: number) {
    Swal.fire({
        title: "Voulez-vous confirmer la suppression ?",
        showDenyButton: true,
        confirmButtonText: "Supprimer",
        denyButtonText: `Annuler`
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteprofil(userId).subscribe((d:any) => {
            if (d.message) {
              this.getprofil()
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
          })
        } else if (result.isDenied) {
          Swal.fire("La suppression a été annulée", "", "info");
        }
      });
  }

  upProfil(profil: any): void {
    // console.log(profil);
    this.id=profil.id;
    this.formulaire.patchValue({
      libelle: profil.libelle
    });
    this.btn = 'update'
  }


}
