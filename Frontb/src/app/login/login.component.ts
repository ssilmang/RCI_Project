import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // loginForm!: FormGroup;
  // resetForm!: FormGroup;


  constructor(private fb: FormBuilder, private router: Router)
  {
    // this.loginForm = fb.group({
    //   identifiant: ['elzondao'],
    //   password: ['elzondao']
    // })

    // this.resetForm = fb.group({
    //   email: ['']
    // })
  }

  login()
  {
    this.router.navigateByUrl('/accueil')
    // const data = this.loginForm.value;
    // console.log(data);
    // let user = { 'name': 'Elzo Ndao', 'role': 'admin' }
    // localStorage.setItem('user', JSON.stringify(user));
    // this.auth.setAccessToken('token');
    // this.auth.login(data).subscribe((d:any) => {
    //   // console.log(res);
    //   if (d.message) {
    //     this.router.navigateByUrl('/dashboard/accueil');
    //     localStorage.setItem('user', JSON.stringify(d.user));
    //     localStorage.setItem('token', JSON.stringify(d.token));
    //     Swal.fire({
    //       title: "Succes!",
    //       text: d.message + d.user.nom_complet +' !',
    //       icon: "success"
    //     });
    //   }else if(d.error){
    //     // console.log(d.error);
    //     this.router.navigateByUrl('/login');
    //     Swal.fire({
    //       title: "Error!",
    //       text: d.error,
    //       icon: "error"
    //     });
    //   }
    // })
  }

  reset()
  {
    // console.log(this.resetForm.value);
    this.closeModal()
  }

  newPassword()
  {
    let modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'block'
    }
  }

  closeModal()
  {
    let modal = document.getElementById('modal')
    if (modal) {
      modal.style.display = 'none'
    }
  }

}
