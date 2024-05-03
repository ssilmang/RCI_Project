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

}
