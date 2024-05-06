import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {

  title!: string
  btn!: string


  constructor(private fb:FormBuilder) {
  }

  ngOnInit() {
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
