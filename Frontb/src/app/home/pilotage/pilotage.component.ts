import { Component } from '@angular/core';


@Component({
  selector: 'app-pilotage',
  standalone: true,
  imports: [],
  templateUrl: './pilotage.component.html',
  styleUrl: './pilotage.component.css'
})
export class PilotageComponent {

  title: string = 'Nouveau control'
  btn: string = 'Ajouter'


  constructor() {
  }

  ngOnInit() {
  }

  openModal()
  {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Nouveau control'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal()
  {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Modification control'
      this.btn = 'Modifier'
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
