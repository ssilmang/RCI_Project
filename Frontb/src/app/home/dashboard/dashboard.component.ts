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
import { TypeService } from '../../_helpers/services/all_methods/type.service';
import { ContryService } from '../../_helpers/services/all_methods/contry.service';
import { Contry2Pipe } from '../../_helpers/pipes/contry2.pipe';
import { TypePipe } from '../../_helpers/pipes/type.pipe';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, NgChartsModule, SweetAlert2Module, CommonModule, Contry2Pipe, TypePipe],
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
  controlsByPays: any
  controlsByType: any
  controlsByStatut: any
  controlsByEtat: any
  controlsByCouv: any

  selectedEtat: boolean = false
  selectedStatut: boolean = false
  selectedCouv: boolean = false

  selectedType: number = 0
  selectedContry: number = 0
  selectedDir: number = 0

  selectedCard: string | null = null;
  direction: string = 'Direction'
  selectForm!: FormGroup
  directions: Signal<Direction[]> = signal([])
  ctrls: Data[] = [];
  datas: Signal<Data[]> = signal([])
  types: Signal<TypeControle[]> = signal([])
  contries: Signal<Contry[]> = signal([])

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = ['Validé', 'Non validé', 'Fait', 'Non fait', 'Applicable', 'Non applicable', 'Exhaustivité', 'Non exhaustivité'];
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [],
        label: 'Total' ,
        backgroundColor: [
          '#008000', // Validé
          '#ff0000', // Non validé
          '#ffff00', // Fait
          '#808080', // Non fait
          '#800080', // Applicable
          '#ffa500', // Non applicable
          '#ffc0cb', // Exhaustivité
          '#add8e6'  // Non exhaustivité
        ],
        // borderColor: [
        //   '#155724', // Validé - Vert foncé
        //   '#721c24', // Non validé - Rouge foncé
        //   '#856404', // Fait - Jaune foncé
        //   '#0c5460', // Non fait - Bleu foncé
        //   '#383d41', // Applicable - Gris foncé
        //   '#818182', // Non applicable - Gris clair
        //   '#004085', // Exhaustivité - Bleu foncé
        //   '#c82333'  // Non exhaustivité - Rouge foncé
        // ],
        // borderWidth: 1
      }
    ]
  };

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
      statut: this.fb.control(0),
      etat: this.fb.control(0),
      couverture: this.fb.control(0),
    })

    this.selectForm.get('pays_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedContry = res
      // console.log(this.selectedContry);
      this.controls = this.ctrls.filter((c:any) => c.user_id.pays_id.id == res)
      console.log(this.controls);
      this.graph(this.controls, 'nothing')
    })

    this.selectForm.get('type')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedType = res
      if (res!=0) {
        this.controlsByPays = this.controls.filter((c:any) => c.type_controle_id.id == res)
        console.log(this.controlsByPays);
        if (this.controlsByPays.length > 0) {
          this.graph(this.controlsByPays, 'nothing')
         }else{
          Swal.fire({
            title: "Error!",
            text: 'Aucune donnée dans ce type',
            icon: "error"
          });
          this.selectForm.patchValue({
            type: 0
          })
        }
      }else{
        this.controlsByPays = this.ctrls.filter((c:any) => c.user_id.pays_id.id == this.selectedContry)
        console.log(this.controlsByPays);
        this.graph(this.controlsByPays, 'nothing')
      }
    })

    this.selectForm.get('statut')?.valueChanges.subscribe(res => {
      // console.log(this.controlsByPays);
      if (res!=0) {
        console.log(res);
        this.controlsByStatut = this.controlsByPays.filter((c:any) => c.etat == res)
        console.log(this.controlsByStatut);
        this.selectedStatut = true
        this.selectedEtat = false
        this.selectedCouv = false
        this.graph(this.controlsByStatut, 'statut')

        this.selectForm.patchValue({
          etat: 0,
          couverture: 0
        }, { emitEvent: false });
      }
    })

    this.selectForm.get('etat')?.valueChanges.subscribe(res => {
      // console.log(this.controlsByPays);
      if (res!=0) {
        console.log(res);
        this.controlsByEtat = this.controlsByPays.filter((c:any) => c.validate == res)
        console.log(this.controlsByEtat);
        this.selectedEtat = true
        this.selectedStatut = false
        this.selectedCouv = false
        this.graph(this.controlsByEtat, 'etat')

        this.selectForm.patchValue({
          statut: 0,
          couverture: 0
        }, { emitEvent: false });
      }
    })

    this.selectForm.get('couverture')?.valueChanges.subscribe(res => {
      // console.log(this.controlsByPays);
      if (res!=0) {
        console.log(res);
        this.controlsByCouv = this.controlsByPays.filter((c:any) => c.exhaustivite == res)
        console.log(this.controlsByCouv);
        this.selectedCouv = true
        this.selectedEtat = false
        this.selectedStatut = false
        this.graph(this.controlsByCouv, 'couv')

        this.selectForm.patchValue({
          etat: 0,
          statut: 0
        }, { emitEvent: false });
      }
    })

    // this.selectForm.get('direction')?.valueChanges.subscribe(res=>{
    //   // console.log(res);
    //   // console.log(this.selectedType);
    //   this.selectedDir = res
    //   if (this.selectedType!=0) {
    //     if (res!=0) {
    //       console.log(res);
    //       this.controlsByType = this.controlsByPays.filter((c:any) => c.direction_id.libelle == res)
    //       if (this.controlsByType.length > 0){
    //         this.graph(this.controlsByType)
    //       }else{
    //       Swal.fire({
    //         title: "Error!",
    //         text: 'Aucune donnée dans cette direction',
    //         icon: "error"
    //       });
    //     }
    //     }else{
    //       // this.controlsByPays = this.controls.filter((c:any) => c.type_controle_id.id == this.selectedType)
    //       console.log(this.controlsByPays);
    //       this.graph(this.controlsByPays)
    //     }
    //   }else{
    //     this.controlsByType = this.controls.filter((c:any) => c.direction_id.libelle == this.selectedDir)
    //     console.log(this.controlsByType);
    //     if (this.controlsByType.length > 0) {
    //       this.graph(this.controlsByPays)
    //     }else{
    //       Swal.fire({
    //         title: "Error!",
    //         text: 'Aucune donnée dans cette direction',
    //         icon: "error"
    //       });
    //     }
    //   }
    // })
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

  graph(data: any, display: string)
  {
    if (data) {
      this.totalControls = data.length
      this.totalValidated = data.filter((d:any) => d.validate === 'Validé').length;
      this.totalNonValidated = data.filter((d:any) => d.validate === 'Non validé').length;
      this.totalDone = data.filter((d:any) => d.etat === 'Fait').length;
      this.totalNotDone = data.filter((d:any) => d.etat === 'Non fait').length;
      this.totalApplicable = data.filter((d:any) => d.etat === 'Applicable').length;
      this.totalNonApplicable = data.filter((d:any) => d.etat === 'Non applicable').length;
      this.totalExhaustivite = data.filter((d:any) => d.exhaustivite === 'Exhaustivité').length;
      this.totalNoExhaustivite = data.filter((d:any) => d.exhaustivite === 'Non exhaustivité').length;

      if (display=='nothing') {
        this.barChartData.datasets[0].data = [
          this.totalValidated, this.totalNonValidated, this.totalDone, this.totalNotDone, this.totalApplicable, this.totalNonApplicable, this.totalExhaustivite, this.totalNoExhaustivite
        ];
      }
      if (display=='statut') {
        this.barChartData.datasets[0].data = [
          this.totalDone, this.totalNotDone, this.totalApplicable, this.totalNonApplicable
        ];
      }
      if (display=='etat') {
        this.barChartData.datasets[0].data = [
          this.totalValidated, this.totalNonValidated
        ];
      }
      if (display=='couv') {
        this.barChartData.datasets[0].data = [
          this.totalExhaustivite, this.totalNoExhaustivite
        ];
      }

      this.barChartData = { ...this.barChartData };
    }

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
