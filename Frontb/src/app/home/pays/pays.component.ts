import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contry } from '../../_helpers/interfaces/data';
import { PaysService } from '../../_helpers/services/all_methods/pays.service';

@Component({
  selector: 'app-pays',
  standalone: true,
  imports: [],
  templateUrl: './pays.component.html',
  styleUrl: './pays.component.css'
})
export class PaysComponent {
  titre!: string
  btn!: string
  id!: number | null
  risk!: boolean
  archive!: boolean

  risque!: FormGroup

  risques: Signal<Contry[]> = signal([])
  archives: Signal<Contry[]> = signal([])
countries() {
throw new Error('Method not implemented.');
}
  countryForm!:FormGroup;
  constructor(private fb: FormBuilder, private pays: PaysService)
  {
    this.risque = this.fb.group({

      libelle: this.fb.control("Senegal")
      
    })
  }


}
