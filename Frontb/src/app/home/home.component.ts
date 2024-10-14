import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../_helpers/services/auth.service';
import { ControleService } from '../_helpers/services/all_methods/controle.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  role!: string;
  use!: any;
  showIcons: boolean = false
  // notifications!:number[]
  user!: string;
  identifiant!: string
  entite: string='all'
  title!: string;
  data!: any
  name: string = ''
  img: string = ''
  hoveredIcon: string | null = null;
  nomComplet!: string
  profil!: string
  unreadCount: number = 0;
  notifications: any[] = [];
  showNotifications: boolean = false;
  // hoveredIcon: string | null = null;
  userId!: number;

  // image!: any

  // userForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ctrl:ControleService
  ){

    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    // console.log(dayOfMonth);
    // if (+dayOfMonth === 1 || +dayOfMonth === 5 || +dayOfMonth === 7) {
    //   this.crud.userDoneFalse().subscribe(d=>{
    //     console.log(d);
    //   })
    // }

    this.recupUser()

    // this.userForm = this.fb.group({
    //   nom_complet: [this.user],
    //   email: [this.use.email],
    //   matricule: [this.use.matricule],
    //   entite: [this.entite],
    //   identifiant: [this.identifiant],
    //   password: [''],
    // })
  }

  ngOnInit()
  {
    // this.loadNotifications();
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    this.nomComplet = userObj.nom_complet;
    const profil = userObj.profil_id
    if (profil == 1) {
      this.profil = 'Porteur'
    }else if (profil == 2) {
      this.profil = 'Super_admin'
    }else if(profil == 3) {
      this.profil = 'Admin_local'
    }
    // console.log(userObj);
  }

  recupUser()
  {
    // let userFromStorage = localStorage.getItem('user');
    // this.use = JSON.parse(userFromStorage!)
    // this.user = this.use.nom_complet
    // this.identifiant = this.use.identifiant
    // this.role = this.use.profil_id.libelle
    // // this.image = 'http://localhost:8000/storage' + this.use.photo
    // if (this.use.entite_id) {
    //   this.entite = this.use.entite_id.sigle
    // }else{
    //   this.entite='all';
    // }
  }

  infoUser()
  {
    const modal = document.getElementById("entite");
    if (modal) {
      modal.style.display = "block";
      this.title = "NOUVELLE ENTITE"
    }
  }

  onFileSelected(event: Event): void {
    // const inputElement = event.target as HTMLInputElement;
    // const selectedImage = inputElement.files?.[0] as File;
    // this.name = selectedImage.name

    // if (selectedImage) {
    //   this.imageService.recupImg(selectedImage).subscribe({
    //     next: (arg) => {
    //       this.img = arg as string;
    //     }
    //   });
    // }
    // console.log(this.name);
    // console.log(this.img);
  }

  updateUser()
  {
    // console.log(this.userForm.value);
    // const data = this.userForm.value
    // data.photo = this.img
    // data.photo_name = this.name
    // console.log(this.use.id, data);
    // this.crud.updateUser(data, this.use.id).subscribe((d:any)=>{
    //   // console.log(d);
    //   if (d.message) {
    //     this.recupUser()
    //     Swal.fire({
    //       title: "Succes!",
    //       text: d.message,
    //       icon: "success"
    //     });
    //     this.closeMod()
    //     localStorage.setItem('user', JSON.stringify(d.user))
    //     this.userForm.reset()
    //   }else if(d.error){
    //     // console.log(d.error);
    //     // Swal.fire({
    //     //   title: "Error!",
    //     //   text: d.error,
    //     //   icon: "error"
    //     // });
    //   }
    // })
  }

  closeMod()
  {
    // const modal = document.getElementById("entite");
    // if (modal) {
    //   modal.style.display = "none";
    //   // this.userForm.reset()
    // }
  }

  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
  // loadNotifications(): void {
  //   this.ctrl.getNotifications(this.userId).subscribe(
  //     data => {
  //       this.notifications = data;
  //       this.unreadCount = data.filter(n => !n.read).length;
  //     },
  //     error => console.error('Erreur lors du chargement des notifications', error)
  //   );
  // }

//   toggleNotifications(): void {
//     this.showNotifications = !this.showNotifications;
//     if (this.showNotifications) {
//       this.loadNotifications(); // Recharger les notifications lorsque le menu est affiché
//     }
// }
// markAsRead(notificationId: number): void {
//   this.ctrl.markAsRead(notificationId).subscribe(
//     () => this.loadNotifications(), // Recharger les notifications après marquage comme lu
//     error => console.error('Erreur lors de la mise à jour de la notification', error)
//   );
// }
// dcjjd(controlId: number, newStatus: string): void {
//   this.ctrl.updateControlStatus(controlId, newStatus).subscribe(
//     () => {
 
//       this.loadNotifications();
//     },
//     error => {
//       // Gérer les erreurs lors de la mise à jour du statut
//       console.error('Erreur lors de la mise à jour du statut du contrôle', error);
//     }
//   );
 }


