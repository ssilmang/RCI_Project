import { Component, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink, RouterLinkActive],
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

  }

}
