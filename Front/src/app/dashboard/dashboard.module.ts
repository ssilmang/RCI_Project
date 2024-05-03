import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UtilisateurComponent } from './components/home/utilisateur/utilisateur.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { PerformanceComponent } from './components/home/performance/performance.component';
import { EntiteComponent } from './components/home/entite/entite.component';
import { IndicateurComponent } from './components/home/indicateur/indicateur.component';
import { ProfilComponent } from './components/home/profil/profil.component';


import { EntityPipe } from './shared/pipes/entity.pipe';
import { TendancePipe } from './shared/pipes/tendance.pipe';
import { YearPipe } from './shared/pipes/year.pipe';
import { IndicEntityPipe } from './shared/pipes/indic-entity.pipe';
import { UserEntitePipe } from './shared/pipes/user-entite.pipe';
import { UserProfilPipe } from './shared/pipes/user-profil.pipe';
import { AnneeComponent } from './components/home/annee/annee.component';
import { ChuckPipe } from './shared/pipes/chuck.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    HomeComponent,
    UtilisateurComponent,
    DashboardComponent,
    PerformanceComponent,
    EntiteComponent,
    IndicateurComponent,
    ProfilComponent,
    EntityPipe,
    TendancePipe,
    YearPipe,
    IndicEntityPipe,
    UserEntitePipe,
    UserProfilPipe,
    AnneeComponent,
    ChuckPipe,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class DashboardModule { }
