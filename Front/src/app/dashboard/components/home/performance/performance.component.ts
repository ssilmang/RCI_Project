import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityPipe } from 'src/app/dashboard/shared/pipes/entity.pipe';
import { TendancePipe } from 'src/app/dashboard/shared/pipes/tendance.pipe';
import { YearPipe } from 'src/app/dashboard/shared/pipes/year.pipe';
import { CrudService } from 'src/app/dashboard/shared/services/crud.service';
import { DataService } from 'src/app/dashboard/shared/services/data.service';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

import * as PptxGenJS from 'pptxgenjs';
import { Observable, map } from 'rxjs';
import { ChuckPipe } from 'src/app/dashboard/shared/pipes/chuck.pipe';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css'],
  providers: [ EntityPipe, YearPipe, TendancePipe, ChuckPipe ]

})
export class PerformanceComponent {
  selectedEntity: string = '';
  selectedYear: string = '2023';
  selectTrio: string = 'un';
  selectedTendance!: string
  inputsDisabled: boolean = true;
  tendance!: string
  display: boolean = true
  up: boolean = true
  role!: string;
  use: any
  user!: string;
  entite!: string;
  respo: boolean = true;
  dayOfMonth: any

  selects!: FormGroup

  data!: any
  overalProjectStatusValue: any;
  managerStatusValue: any;
  projectDetails: any[]=[];
  projects: any[]=[];
  indicateurs: any[]=[];

  constructor(private saveData: DataService, private crud: CrudService, private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService)
  {
    this.selects = this.fb.group({
      entite: [''],
      periode: ['first'],
      annee: ['2023'],
      tendance: ['all']
    })

    this.selects.get('entite')?.valueChanges.subscribe((d: any) => {
      // console.log(d);
      this.selectedEntity = d
    });

    this.selects.get('annee')?.valueChanges.subscribe((d: any) => {
      // console.log(d);
      this.selectedYear = d
    });

    this.selects.get('periode')?.valueChanges.subscribe((d: any) => {
      // console.log(d);
      this.selectTrio = d
    });

    this.selects.get('tendance')?.valueChanges.subscribe((d: any) => {
      // console.log(d);
      this.selectedTendance = d
    });
  }

  ngOnInit()
  {
    this.fetchIndicateurs()

    let userStorage = localStorage.getItem('user');
    this.use = JSON.parse(userStorage!)
    this.user = this.use.nom_complet
    this.role = this.use.profil_id.libelle
    if (this.use.entite_id) {
      this.entite = this.use.entite_id.sigle
    }

    if (this.role=='Utilisateur') {
      this.selectedEntity = this.entite
    }else{
      this.selectedEntity = this.selectedEntity
    }

    let userFromStorage = localStorage.getItem('user');
    let user = JSON.parse(userFromStorage!)
    if (user.profil_id.libelle=='Utilisateur') {
      this.display = false
    }else{
      this.display = true
    }

    if (user.profil_id.libelle=='Admin') {
      this.up = true
    }else{
      this.up = false
    }

    const currentDate = new Date();
    this.dayOfMonth = currentDate.getDate();
    // console.log(this.dayOfMonth);

    let donnees = localStorage.getItem('data');
    if(donnees) {
      this.data = JSON.parse(donnees)
      this.enableByUser(this.data)
      // console.log(this.data);
    }else{
      this.crud.getDatas().subscribe(d=>{
        this.data = d;
        // console.log(this.data);
        this.enableByUser(this.data)
        localStorage.setItem('data', JSON.stringify(this.data));
        console.log(this.data);
      })
    }

    // this.saveData.data2.subscribe((data:any) => {
    //   if (data) {
    //     this.data = data;
    //   }else{
    //     let donnees = localStorage.getItem('data');
    //     if (donnees) {
    //       let donnee = JSON.parse(donnees!);
    //       this.data = donnee
    //     }else{
    //       localStorage.setItem('data', JSON.stringify(this.data));
    //     }
    //   }
    // })
  }

  enableByUser(data: any)
  {
    data.forEach((year:any) => {
      year.datas.forEach((item:any) => {
        item.data.forEach((i: any) => {
          if (+this.dayOfMonth <= 10 && +this.dayOfMonth > 1) {
            if(this.role=='Responsable' || this.role=='Interim')
            {
              i.enabled = item.entity == this.entite;
            }
          }
          if(this.role=='Admin') {
            i.enabled = item.entity != this.entite;
          }
        });
      });
    });
  }

  updateValue(newValue: string, type: string, indic: any, ent: any) {
    // newValue = newValue.replace('%', '');
    // console.log(newValue);
    // console.log(type);
    // console.log(indic.indicateur);
    // console.log(ent.entity);
    if (type!='objectif' && type!='taux' && type!='analyse' && type!='plan') {
      if (newValue.includes('%') && indic.objectif.includes('%')) {
        let value = newValue.replace('%', '');
        let obj = indic.objectif.replace('%', '');
        // console.log(value, obj);
        indic.taux = ((+value)/(+obj))* 100 + '%'
      }
    }

    let entities = this.data.filter((entity:any) => entity.annee == this.selectedYear)
    // console.log(entities);
    entities.forEach((entity:any) =>
    {
      entity.datas.forEach((data:any) =>
      {
        if (data.entity == ent.entity) {
          // console.log(data.entity);
          data.data.forEach((element:any) => {
            if (element.indicateur == indic.indicateur) {
              if (element.hasOwnProperty(type)) {
                element[type] = newValue;
                // console.log(this.data);
                localStorage.setItem('data', JSON.stringify(this.data));
              }
            }
          });
        }
      })
    })
  }

  saveChanges()
  {
    // console.log(this.user);
    let donnees = localStorage.getItem('data');
    let donnee = JSON.parse(donnees!);
    // console.log(donnee);
    this.crud.upData(donnee).subscribe((d:any) => {
      // console.log(data);
      this.fetchIndicateurs()
      if (d.message) {
        Swal.fire({
          title: "Succes!",
          text: d.message,
          icon: "success"
        });
      }else if(d.error){
        // console.log(d.error);
        Swal.fire({
          title: "Error!",
          text: d.error,
          icon: "error"
        });
      }
    })
    // console.log(this.use);
    if (this.use.profil_id.libelle == 'Responsable' || this.use.profil_id.libelle == 'Interim'){
      this.crud.upUserToTrue(this.use.id).subscribe(d=>{
        console.log(d);
      })
    }else if (this.use.profil_id.libelle == 'Admin') {
      this.crud.upUserToFalse().subscribe((d:any)=>
      {
        console.log(d);
      })
    }

    // localStorage.removeItem('data');

    // if (this.inputsDisabled==true) {
    //   this.inputsDisabled = false
    //   // localStorage.setItem('disp', JSON.stringify(this.inputsDisabled))
    //   this.data.forEach((year:any) => {
    //     year.datas.forEach((item:any) => {
    //       item.data.forEach((i:any) => {
    //         i.enabled = true
    //       });
    //     });
    //   });
    // }else{
    //   this.inputsDisabled = true
    //   let donnees = localStorage.getItem('data');
    //   let donnee = JSON.parse(donnees!);
    //   // console.log(donnee);
    //   this.saveData.setData(donnee);
    //   // localStorage.setItem('disp', JSON.stringify(this.inputsDisabled))
    //   this.data.forEach((year:any) => {
    //     year.datas.forEach((item:any) => {
    //       item.data.forEach((i:any) => {
    //         i.enabled = false
    //       });
    //     });
    //   });
    // }

  }

  exportExcel(data: any[], fileName: string) {
    const wb = XLSX.utils.book_new();
    data.forEach(year => {
      const wsData = [];
      let rowNum = 1;

      wsData.push([
        { wch: 20 },
        'Jan',
        'Fév',
        'Mars',
        'Avr',
        'Mai',
        'Juin',
        'Juil',
        'Aout',
        'Sept',
        'Oct',
        'Nov',
        'Déc',
        'Objectif',
        'Taux',
        'Tendance',
        'Analyse',
        'Plan'
      ]);

      year.datas.forEach((entity: any) => {
        wsData.push([entity.entity]);

        entity.data.forEach((record: any) => {
          const row = [
            record.indicateur,
            record.janvier,
            record.fevrier,
            record.mars,
            record.avril,
            record.mai,
            record.juin,
            record.juillet,
            record.aout,
            record.septembre,
            record.octobre,
            record.novembre,
            record.decembre,
            record.objectif,
            record.taux,
            'basse',
            record.analyse,
            record.plan
          ];

          wsData.push(row);
          rowNum++;
        });
      });

      const ws = XLSX.utils.aoa_to_sheet(wsData);

      ws['!cols'] = [
          { width: 50 },
          ...Array(17).fill({ width: 7 })
      ];

      ws['!rows'] = Array(wsData.length).fill({ hpx: 45 });
    for (const i in ws) {
          console.log('llll',ws[i]);
      if (typeof ws[i] != 'object') continue;
      let cell = XLSX.utils.decode_cell(i);
      console.log( ws[i]);
      ws[i].s = {
        font: {
          name: 'arial',
        },
        alignment: {
          vertical: 'center',
          horizontal: 'center',
          wrapText: '1',
        },
        border: {
          right: {
            style: 'thin',
            color: 'FFA500',
          },
          left: {
            style: 'thin',
            color: 'FFA500',
          },
        },
      };

      }
      XLSX.utils.book_append_sheet(wb, ws, `${year.annee}`);
    });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  exportToExcel(): void {
    this.exportExcel(this.data, 'performances');
  }

  fetchIndicateurs() {
    this.saveData.getIndicateur().subscribe(
      (taux: any) => {
        // Créer un tableau d'observables pour récupérer les entités indicatrices
        const observables = taux.map((element: any) => {
            return this.crud.getEntiteByEntiteIndic(element.entite_indic_id).pipe(
                map((d: any) => d.sigle)
            );
        });

        // Utiliser forkJoin pour attendre toutes les requêtes HTTP
        forkJoin(observables).subscribe(
            (sigles: any) => {
                // Ajouter chaque indicateur avec son sigle correspondant
                taux.forEach((element: any, index: number) => {
                    this.indicateurs.push({
                        libelle: element.libelle,
                        entite: sigles[index]
                    });
                });
                // console.log(this.indicateurs);
            },
            (error: any) => {
                console.error('Une erreur s\'est produite lors de la récupération des indicateurs :', error);
            }
        );
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des indicateurs :', error);
      }
    );
  }

}
