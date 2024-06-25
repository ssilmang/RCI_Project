import { Routes } from '@angular/router';
import { PagenotefoundComponent } from './pagenotefound/pagenotefound.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PilotageComponent } from './home/pilotage/pilotage.component';
import { UtilisateurComponent } from './home/utilisateur/utilisateur.component';
import { Setting1Component } from './home/setting1/setting1.component';
import { Setting2Component } from './home/setting2/setting2.component';
import { ControleComponent } from './home/controle/controle.component';
import { RisqueComponent } from './home/risque/risque.component';
import { PaysComponent } from './home/pays/pays.component';
import { TypeControleComponent } from './home/type-controle/type-controle.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pilotage', component: PilotageComponent },
      { path: 'parametrage1', component: Setting1Component },
      { path: 'parametrage2', component: Setting2Component },
      { path: 'controles', component: ControleComponent },
      { path: 'risques', component: RisqueComponent },
      { path: 'controle', component: ControleComponent },
      { path: 'utilisateurs', component: UtilisateurComponent },
      { path: 'pays', component: PaysComponent },
      { path: 'typecontrole', component: TypeControleComponent  },


    ]
   },
  { path: '**', component: PagenotefoundComponent }

];
