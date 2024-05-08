import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css'
})
export class ControleComponent {

  title!: string
  btn!: string

  controle!: FormGroup


  constructor(private fb: FormBuilder)
  {
    this.controle=this.fb.group({
      nom: this.fb.control("Controle 1"),
      code: this.fb.control("C1"),
    });
  }

  ngOnInit()
  {

  }

  addOrUpCtrl()
  {
    console.log(this.controle.value);

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
