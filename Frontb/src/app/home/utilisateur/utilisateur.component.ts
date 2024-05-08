import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {

  title!: string
  btn!: string

  utilisateur!: FormGroup

  constructor(private fb:FormBuilder) {
    this.utilisateur=this.fb.group({
      nomComplet: this.fb.control("Elhadji Malick Ndao"),
      telephone: this.fb.control("783845870"),
      adresse: this.fb.control("Grand Yoff"),
      matricule: this.fb.control("17UUD"),
      email: this.fb.control("ndaoelhadji973@gmail.com"),
      password: this.fb.control("elzondao"),
      direction:this.fb.control(0),
      service:this.fb.control(0),

    });
  }

  ngOnInit() {
  }

  addOrUpUser()
  {
    console.log(this.utilisateur.value);

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
