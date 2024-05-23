import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { Risque } from '../../_helpers/interfaces/data';
import { RisqueService } from '../../_helpers/services/all_methods/risque.service';


@Component({
  selector: 'app-risque',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule],
  templateUrl: './risque.component.html',
  styleUrl: './risque.component.css'
})
export class RisqueComponent {

  titre!: string
  btn!: string
  id!: number | null
  risk: boolean = true
  archive: boolean = false

  risque!: FormGroup

  risques: Signal<Risque[]> = signal([])
  archives: Signal<Risque[]> = signal([])

  constructor(private fb: FormBuilder, private riskk: RisqueService)
  {
    this.risque = this.fb.group({
      libelle: this.fb.control("Risque 1")
    })
  }

  ngOnInit()
  {

  }

  getRisques()
  {

  }

  selectControle()
  {
    this.risk = true;
    this.archive = false
  }

  selectArchive()
  {
    this.risk = false;
    this.archive = true
  }

  openModal()
  {
    let modal = document.getElementById('risk');
    if (modal) {
      this.titre = 'Nouvelle risque'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  closeModal()
  {
    let modal = document.getElementById('risk');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  addOrUpRisk()
  {

  }

}
