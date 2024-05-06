import { Component } from '@angular/core';

@Component({
  selector: 'app-setting1',
  standalone: true,
  imports: [],
  templateUrl: './setting1.component.html',
  styleUrl: './setting1.component.css'
})
export class Setting1Component {

  btn: string = 'Ajouter'
  button!: string
  title: string = 'Modification pole'


  constructor()
  {}

  ngOnInit()
  {

  }


  editDirec()
  {
    this.btn = 'Modifier'
  }

  openModal()
  {
    let modal = document.getElementById('pole');
    if (modal) {
      this.title = 'Nouveau pole'
      this.button = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal()
  {
    let modal = document.getElementById('pole');
    if (modal) {
      this.title = 'Modification pole'
      this.button = 'Modifier'
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('pole');
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
