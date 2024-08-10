import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Contry, Direction, TypeControle } from '../../_helpers/interfaces/data';
import { Data } from '../../_helpers/interfaces/data';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { DataService } from '../../_helpers/services/all_methods/data.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TypeService } from '../../_helpers/services/all_methods/type.service';
import { ContryService } from '../../_helpers/services/all_methods/contry.service';
import { Contry2Pipe } from '../../_helpers/pipes/contry2.pipe';
import { TypePipe } from '../../_helpers/pipes/type.pipe';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { CrudService } from '../../_helpers/services/crud.service';


interface ControlGroup {
  [key: string]: {
    statut?: string;
    etat?: string;
    controls: number;
  };
}

interface ControlItem {
  country: string;
  control_count: number;
  controls_by_status: ControlGroup;
  controls_by_etat: ControlGroup;
  controls: Array<{
    id: number;
    description: string | null;
    status: string;
    etat: string;
    type: number;
  }>;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, NgChartsModule, SweetAlert2Module, CommonModule, Contry2Pipe, TypePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {




  
  totalControls: number = 0;
  totalValidated: number = 0;
  totalNonValidated: number = 0;
  totalDone: number = 0;

  pieChartLabels: string[] = [];
  pieChartDataValues: number[] = [];
  // pieChartDataValues: number[] = [];
  totalNotDone: number = 0;
  totalApplicable: number = 0;
  totalNonApplicable: number = 0;
  totalExhaustivite: number = 0;
  totalNoExhaustivite: number = 0;
  controls: any[] = [];
  controles: any[] = [];
  controlsByPays: any
  controlsByType: any
  controlsByStatut: any
  controlsByEtat: any
  controlsByCouv: any
  dataFetch:any[]=[]
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

  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#ffffff', // Couleur des labels
        display: true, // Afficher les labels
        formatter: (value, context) => {
          return value; 
        },
        font: {
          weight: 'bold', 
          size: 16 
        }
      }
    }
  };

  
  pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,

    datasets: [
      {
        data:this.pieChartDataValues, // Données pour chaque segment
        label: 'Total', // Label du dataset
        backgroundColor: [
          '#008000', '#ff0000', '#ffff00', '#808080', '#add8e6'
        ], // Couleurs des segments
      }
    ]
  };

  // Plugins à utiliser
  chartPlugins = [pluginDataLabels];

  constructor(private fb: FormBuilder,
    private dirService: DirectionService,
    private router: Router,
    private data: DataService,
    private contryService: ContryService,
    private type: TypeService,
    private crud:CrudService
  )
  {
    this.selectForm = this.fb.group({
      pays_id: this.fb.control(0),
      type: this.fb.control(0),
      statut: this.fb.control(0),
      etat: this.fb.control(0),
      couverture: this.fb.control(0),
    });
    

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
          // this.updatePieChart('type');
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
        // this.updatePieChart('type');
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
        this.updatePieChart('statut',res); // Mettre à jour le pie chart pour le statut
        this.selectForm.patchValue({ etat: 0, couverture: 0 }, { emitEvent: false });
        // this.updatePieChart('statut');

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
        this.updatePieChart('etat',res); // Mettre à jour le pie chart pour l'état
        this.selectForm.patchValue({ statut: 0, couverture: 0 }, { emitEvent: false });

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
        this.updatePieChart('couv',res); // Mettre à jour le pie chart pour la couverture
        this.selectForm.patchValue({ etat: 0, statut: 0 }, { emitEvent: false });

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
  // updatePieChart(filterType: 'statut' | 'etat' | 'couv' | 'type') {
  //   // Filtrer les contrôles selon le type de filtre
  //   let filteredControls = this.ctrls;
  
  //   // Appliquer le filtre en fonction du type sélectionné
  //   if (filterType === 'statut') {
  //     filteredControls = filteredControls.filter(c => c.etat === this.selectedStatut);
  //   } else if (filterType === 'etat') {
  //     filteredControls = filteredControls.filter(c => c.validate === this.selectedStatut); // Assurez-vous que c'est le bon filtre
  //   } else if (filterType === 'couv') {
  //     filteredControls = filteredControls.filter(c => c.exhaustivite === this.selectedStatut); // Assurez-vous que c'est le bon filtre
  //   } else if (filterType === 'type') {
  //     filteredControls = filteredControls.filter(c => c.type_controle_id.id === this.selectedStatut); // Assurez-vous que c'est le bon filtre
  //   }
  
  //   // Si aucun pays n'est sélectionné, afficher les contrôles pour tous les pays
  //   const controlsByCountry = this.contries().map(country => {
  //     // Compter le nombre de contrôles filtrés pour chaque pays
  //     const count = filteredControls.filter(c => c.user_id.pays_id.id === country.id).length;
  //     return { country: country.libelle, count: count };
  //   }).filter(data => data.count > 0); // Filtrer les pays avec des contrôles
  
  //   // Met à jour les labels et les données du graphique en secteurs
  //   this.pieChartLabels = controlsByCountry.map(c => c.country);
  //   this.pieChartData.datasets[0].data = controlsByCountry.map(c => c.count);
  
  //   this.pieChartData = { ...this.pieChartData }; // Force la mise à jour du graphique
  // }
  
  
  
  
  
  
  // ngAfterViewInit(): void {
  //   this.crud.getControlsGroupedByCountry().subscribe({
  //     next:(response)=>{
  //       this.dataFetch = response;
  //       console.log(this.dataFetch);
        
  //     }
  //   })
  //   // console.log(this.dataFetch);
  //   // this.initializeChart(this.controls);
  // }

  ngOnInit()
  {

    this.fetchControls()
    this.getDirections()
    this.getData()
    this.getTypes()
    this.getContries()
    // this.crud.getControlsGroupedByCountry().subscribe(
    //   (data) => {
    //     this.controls = data;
    //     this.dataFetch = data
    //     console.log(this.controls); 
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la récupération des données', error);
    //   }
    // );
   
    // console.log(this.controls);
    
    // console.log(this.dataFetch);
    

    localStorage.removeItem('direction')
    localStorage.removeItem('etat')
    // console.log(this.controls);
    
    
    
    
  }
  fetchControls() {
    this.crud.getControlsGroupedByCountry().subscribe(
      (data) => {
        this.controles = data;
        // this.dataFetch = data
        console.log(this.controles); 
        
        this.pieChartDataValues = this.controles.map(item => item.control_count);
        console.log(this.pieChartDataValues);
     
     this.pieChartData = {
      labels: ['Senegal','Mali','Guinne Bissau','Guinee Konacry','Sierra Leone'],
      datasets: [
        {
          data: this.pieChartDataValues,
          label: 'Total controle',
          backgroundColor: ['#008000', '#ff0000', '#ffff00', '#808080', '#add8e6'],
        }
      ]
    };
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
    
    
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
      console.log(this.barChartData);
      
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


  // updatePieChart() {
  //   // Met à jour les labels et les données du graphique
  //   this.pieChartLabels = this.controlsByCountry.map(c => c.country);
  //   this.pieChartData.datasets[0].data = this.controlsByCountry.map(c => c.count);

  //   this.pieChartData = { ...this.pieChartData }; // Force la mise à jour du graphique
  // }

 
//   initializeChart(controls:any): void {
//       this.pieChartLabels = controls.map((item:any) => item.country);
//    console.log('Labels:', this.pieChartLabels);

//     this.pieChartDataValues = controls.map((item:any) => item.control_count);
//     console.log('Data Values:', this.pieChartDataValues);

//     this.pieChartData = {
//       labels: ['Senegal','Mali','Guinne Bissau','Guinee Konacry','Sierra Leone'],
//       datasets: [
//         {
//           data: [12,12,12,12,12],
//           label: 'Total',
//           backgroundColor: ['#008000', '#ff0000', '#ffff00', '#808080', '#add8e6'],
//         }
//       ]
//     };
  


// }



updatePieChart(criteria: string,res:string) {
  console.log(this.controles);

  if (this.controles && this.controles.length > 0) {
    let pieChartDataValues: number[] = [];
    let pieChartLabels: string[] = [];

    // Map des critères de filtrage
    const filterMap: { [key: string]: keyof ControlItem } = {
      'statut': 'controls_by_status',
      'etat': 'controls_by_etat'
    };

    
    const filterField = filterMap[criteria as keyof typeof filterMap];
    console.log(filterField);
    
    const filterValue = res; 

    if (filterField) {
      console.log(this.controles);
      
      this.controles.forEach(item => {
       
        console.log(item);
        
        const controlGroup = item[filterField] as ControlGroup;
        // console.log(controlGroup);
        
console.log(Object.values(controlGroup));

        // Trouver un contrôle qui correspond au critère de filtrage
        const filteredControl = Object.values(controlGroup).find(control => control.statut === filterValue || control.etat === filterValue);
console.log(filteredControl);
console.log(filterValue);

        if (filteredControl) {
          pieChartLabels.push(item.country); // Ajouter le nom du pays
          pieChartDataValues.push(filteredControl.controls); // Ajouter le nombre de contrôles
        }
      });
    } else {
      // Pas de filtrage, afficher toutes les données
      pieChartLabels = this.controles.map(item => item.country);
      pieChartDataValues = this.controles.map(item => item.control_count || 0);
    }

    this.pieChartData = {
      labels: pieChartLabels, // Labels des pays
      datasets: [
        {
          data: pieChartDataValues, // Données en fonction du critère sélectionné
          label: `Total contrôle - ${criteria}`,
          backgroundColor: ['#008000', '#ff0000', '#ffff00', '#808080', '#add8e6'],
        }
      ]
    };
  }
}







}