import { Component, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
// import { TranslateService } from '@ngx-translate/core';


type UserType = {
  readonly id: number;
  name: string;
  isActive: boolean;
  additionalInfo: string;
  status?: 'active' | 'inactive';
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SweetAlert2Module, CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontb';

  users: Signal<UserType[]> = signal([
    { id: 1, name: 'Alice', isActive: true, additionalInfo: 'Others Infos', status: 'active' },
    { id: 2, name: 'Bob', isActive: false, additionalInfo: 'Nothing' },
    { id: 3, name: 'Charlie', isActive: true, additionalInfo: 'Nothing' }
  ]);

  ngOnInit()
  {
    this.users = signal([])
  }

  constructor(private router: Router)
  {
    // translate.setDefaultLang('en');
  }
  
  switchLanguage(language: string) {
    // this.translate.use(language);
  }
}
