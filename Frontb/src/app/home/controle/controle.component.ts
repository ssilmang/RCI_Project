import { Component } from '@angular/core';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css'
})
export class ControleComponent {

  title!: string
  btn!: string


  constructor()
  {}

  ngOnInit()
  {

  }

  openModal()
  {
    let modal = document.getElementById('controle');
    if (modal) {
      this.title = 'Nouveau controle'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal()
  {
    let modal = document.getElementById('controle');
    if (modal) {
      this.title = 'Modification controle'
      this.btn = 'Modifier'
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('controle');
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
