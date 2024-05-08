import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './setting1.component.html',
  styleUrl: './setting1.component.css'
})
export class Setting1Component {

  btn: string = 'Ajouter'
  button!: string
  title: string = 'Modification pole'

  Pole!: FormGroup

  constructor(private fb: FormBuilder)
  {
    this.Pole=this.fb.group({
      libelle: this.fb.control("Pole 1"),
      direction: this.fb.control(0),
    });
  }

  ngOnInit()
  {

  }

  addOrUpPole()
  {
    console.log(this.Pole.value);
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
