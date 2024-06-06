import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Direction } from '../../_helpers/interfaces/data';
import { Data } from '../../_helpers/interfaces/data';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { DataService } from '../../_helpers/services/all_methods/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalControls: number = 0;
  totalValidated: number = 0;
  totalNonValidated: number = 0;
  totalDone: number = 0;
  totalNotDone: number = 0;
  totalApplicable: number = 0;
  totalNonApplicable: number = 0;
  controls: any

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any[] = ['Total', 'Fait', 'Non Fait', 'Applicable', 'Non Applicable'];
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: any[] = []
  selectedCard: string | null = null;
  direction: string = 'Direction'
  selectForm!: FormGroup
  directions: Signal<Direction[]> = signal([])
  ctrls: Data[] = [];
  datas: Signal<Data[]> = signal([])


  constructor(private fb: FormBuilder,
    private dirService: DirectionService,
    private router: Router,
    private data: DataService
  )
  {
    this.selectForm = this.fb.group({
      direction: this.fb.control('Direction')
    })

    this.selectForm.get('direction')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.direction = res
      console.log(this.ctrls);
      this.controls = this.ctrls.filter((c:any) => c.direction_id.libelle == res)
      this.totalControls = this.controls.length
      this.totalValidated = this.controls.filter((d:any) => d.validate === 'Validé').length;
      this.totalNonValidated = this.controls.filter((d:any) => d.validate === 'Non validé').length;
      this.totalDone = this.controls.filter((d:any) => d.etat === 'Fait').length;
      this.totalNotDone = this.controls.filter((d:any) => d.etat === 'Non fait').length;
      this.totalApplicable = this.controls.filter((d:any) => d.etat === 'Applicable').length;
      this.totalNonApplicable = this.controls.filter((d:any) => d.etat === 'Non applicable').length;

      this.barChartData = [
        { 
          data: [this.totalControls, this.totalDone, this.totalNotDone, this.totalApplicable, this.totalNonApplicable], 
          label: 'Nombre de contrôles',
          backgroundColor: ['blue', 'yellow', 'gray', 'purple', 'orange']
        }
      ];

    })
  }

  ngOnInit()
  {
    this.getDirections()
    this.getData()

    localStorage.removeItem('direction')
    localStorage.removeItem('etat')
  }

  getData()
  {
    this.data.listResources().subscribe((res:any)=>{
      this.datas = signal(res.controles);
      this.ctrls = res.controles
      // console.log(res.controles);
    })
  }

  getDirections()
  {
    this.dirService.listResources().subscribe(r => {
      this.directions = signal(r)
      // console.log(this.directions);
    })
  }

  selectCard(card: string) {
    this.selectedCard = card;
    if (this.direction != 'Direction' && this.totalControls > 0) {
      // console.log(card, this.direction);
      Swal.fire({
        title: "Voulez-vous voir les contrôles associés ?",
        showDenyButton: true,
        confirmButtonText: "Oui",
        denyButtonText: `Annuler`
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('direction', JSON.stringify(this.direction))
          localStorage.setItem('etat', JSON.stringify(card))
          this.router.navigate(['accueil/pilotage']);
        } else if (result.isDenied) {
          Swal.fire("L'action a été annulée", "", "info");
        }
      });
    }
  }

  graph()
  {
    
  }

}
