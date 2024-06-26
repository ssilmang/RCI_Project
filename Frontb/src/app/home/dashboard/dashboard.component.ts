import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Contry, Direction, TypeControle } from '../../_helpers/interfaces/data';
import { Data } from '../../_helpers/interfaces/data';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { DataService } from '../../_helpers/services/all_methods/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { TypeService } from '../../_helpers/services/all_methods/type.service';
import { ContryService } from '../../_helpers/services/all_methods/contry.service';
import { Contry2Pipe } from '../../_helpers/pipes/contry2.pipe';
import { TypePipe } from '../../_helpers/pipes/type.pipe';
// import { Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, SweetAlert2Module, CommonModule, Contry2Pipe, TypePipe],
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
  totalExhaustivite: number = 0;
  totalNoExhaustivite: number = 0;
  controls: any

  selectedType: number = 0
  selectedContry: number = 0

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
  types: Signal<TypeControle[]> = signal([])
  contries: Signal<Contry[]> = signal([])



  constructor(private fb: FormBuilder,
    private dirService: DirectionService,
    private router: Router,
    private data: DataService,
    private contryService: ContryService,
    private type: TypeService
  )
  {
    this.selectForm = this.fb.group({
      pays_id: this.fb.control(0),
      type: this.fb.control(0),
      direction: this.fb.control(0)
    })

    this.selectForm.get('direction')?.valueChanges.subscribe(res=>{
      // console.log(res);
      // this.direction = res
      // console.log(this.ctrls);
      this.controls = this.ctrls.filter((c:any) => c.direction_id.libelle == res)
      this.totalControls = this.controls.length
      this.totalValidated = this.controls.filter((d:any) => d.validate === 'Validé').length;
      this.totalNonValidated = this.controls.filter((d:any) => d.validate === 'Non validé').length;
      this.totalDone = this.controls.filter((d:any) => d.etat === 'Fait').length;
      this.totalNotDone = this.controls.filter((d:any) => d.etat === 'Non fait').length;
      this.totalApplicable = this.controls.filter((d:any) => d.etat === 'Applicable').length;
      this.totalNonApplicable = this.controls.filter((d:any) => d.etat === 'Non applicable').length;
      this.totalExhaustivite = this.controls.filter((d:any) => d.exhaustivite === 'Exhaustivité').length;
      this.totalNoExhaustivite = this.controls.filter((d:any) => d.exhaustivite === 'Non exhaustivité').length;

      this.barChartData = [
        {
          data: [this.totalControls, this.totalDone, this.totalNotDone, this.totalApplicable, this.totalNonApplicable],
          label: 'Nombre de contrôles',
          backgroundColor: ['blue', 'yellow', 'gray', 'purple', 'orange']
        }
      ];

    })

    this.selectForm.get('type')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedType = res
      this.controls = this.ctrls.filter((c:any) => c.controle_id.type_controle_id == res)
      console.log(this.controls);

    })

    this.selectForm.get('pays_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedContry = res
      this.controls = this.ctrls.filter((c:any) => c.user_id.pays_id.id == res)
      console.log(this.controls);

    })
  }

  ngOnInit()
  {
    this.getDirections()
    this.getData()
    this.getTypes()
    this.getContries()

    localStorage.removeItem('direction')
    localStorage.removeItem('etat')
  }

  getData()
  {
    this.data.listResources().subscribe((res:any)=>{
      this.datas = signal(res.controles);
      this.ctrls = res.controles
      console.log(res.controles);
    })
  }

  getTypes()
  {
    this.type.listResources().subscribe((r:any) => {
      this.types = signal(r.types)
      // console.log(r);
    })
  }

  getContries()
  {
    this.contryService.listResources().subscribe((res:any) => {
      this.contries = signal(res.data)
      // console.log(res);
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
      localStorage.setItem('direction', JSON.stringify(this.direction))
      localStorage.setItem('etat', JSON.stringify(card))
      this.router.navigate(['accueil/pilotage']);
      // Swal.fire({
      //   title: "Voulez-vous voir les contrôles associés ?",
      //   showDenyButton: true,
      //   confirmButtonText: "Oui",
      //   denyButtonText: `Annuler`
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     localStorage.setItem('direction', JSON.stringify(this.direction))
      //     localStorage.setItem('etat', JSON.stringify(card))
      //     this.router.navigate(['accueil/pilotage']);
      //   } else if (result.isDenied) {
      //     Swal.fire("L'action a été annulée", "", "info");
      //   }
      // });
    }
  }

}
