import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-setting2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setting2.component.html',
  styleUrl: './setting2.component.css'
})
export class Setting2Component {

  display: boolean = true;
  service: boolean = true
  activite: boolean = false
  button!: string
  title!: string
  button2!: string
  title2!: string
  button3!: string
  title3!: string


  selectActivite()
  {
    this.activite = true;
    this.service = false
  }

  selectService()
  {
    this.activite = false;
    this.service = true
  }

  openModal()
  {
    let modal = document.getElementById('departement');
    if (modal) {
      this.title = 'Nouveau departement'
      this.button = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal()
  {
    let modal = document.getElementById('departement');
    if (modal) {
      this.title = 'Modification departement'
      this.button = 'Modifier'
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('departement');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openModal2()
  {
    let modal = document.getElementById('service');
    if (modal) {
      this.title2 = 'Nouveau service'
      this.button2 = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal2()
  {
    let modal = document.getElementById('service');
    if (modal) {
      this.title2 = 'Modification service'
      this.button2 = 'Modifier'
      modal.style.display = 'block';
    }
  }

  closeModal2()
  {
    let modal = document.getElementById('service');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openModal3()
  {
    let modal = document.getElementById('activite');
    if (modal) {
      this.title3 = 'Nouveau activite'
      this.button3 = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal3()
  {
    let modal = document.getElementById('activite');
    if (modal) {
      this.title3 = 'Modification activite'
      this.button3 = 'Modifier'
      modal.style.display = 'block';
    }
  }

  closeModal3()
  {
    let modal = document.getElementById('activite');
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
