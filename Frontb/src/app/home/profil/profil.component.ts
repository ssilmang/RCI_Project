import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  titre!: string
  btn!: string
  profilForm!:FormGroup;

  openModal()
  {
    let modal = document.getElementById('land');
    if (modal) {
      this.titre = 'Nouveau Pays'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }
  
  closeModal()
  {
    let modal = document.getElementById('land');
    if (modal) {
      modal.style.display = 'none';
      this.profilForm.reset()
    }
  }

}
