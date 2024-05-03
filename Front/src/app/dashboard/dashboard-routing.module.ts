import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { EntiteComponent } from './components/home/entite/entite.component';
import { UtilisateurComponent } from './components/home/utilisateur/utilisateur.component';
import { IndicateurComponent } from './components/home/indicateur/indicateur.component';
import { PerformanceComponent } from './components/home/performance/performance.component';
import { ProfilComponent } from './components/home/profil/profil.component';
import { AnneeComponent } from './components/home/annee/annee.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'performance', pathMatch: 'full' },
      { path: 'accueil', component: DashboardComponent },
      { path: 'performance', component: PerformanceComponent },
      { path: 'entite', component: EntiteComponent },
      { path: 'indicateur', component: IndicateurComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'utilisateur', component: UtilisateurComponent },
      { path: 'annee', component: AnneeComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
