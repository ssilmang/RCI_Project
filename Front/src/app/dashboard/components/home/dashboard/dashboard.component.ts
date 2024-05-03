import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {BarElement, CategoryScale,  LineController, LineElement, LinearScale} from 'node_modules/chart.js';
import { BarController } from 'chart.js'
import { Chart } from 'chart.js/auto';
// import   pptxgen from 'pptxgenjs';
import jsPDF from 'jspdf';
import { CrudService } from 'src/app/dashboard/shared/services/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import   pptxgen from 'pptxgenjs';
import html2canvas from 'html2canvas';
import { DataService } from 'src/app/dashboard/shared/services/data.service';
import { Observable, map } from 'rxjs';
import { forkJoin } from 'rxjs';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datas!: any
  role!: string;
  user!: string;
  selectedEntity: string = 'ARQ'
  selectedIndic!: any
  display!: boolean
  selects!: FormGroup
  entite!: string;
  dayOfMonth: any

  selectedOptions: string[] = [];
  allSelected: boolean = false;

  data!: any
  indicateurs: any[]=[];


  constructor(private saveData: DataService, private crud: CrudService, private fb: FormBuilder, private toastr: ToastrService,private apiService: DataService)
  {
    this.selects = this.fb.group({
      entite: [this.selectedEntity],
      // indicateur: ['all'],
      // indicateur: [[]]
    })

    this.selects.get('entite')?.valueChanges.subscribe((d: any) => {
      // console.log(this.role, this.entite);

      this.selectedEntity = d
      // console.log(this.datas);
      const chartContainer = document.getElementById('charts-container');
      if (chartContainer) {
        while (chartContainer.firstChild) {
          chartContainer.removeChild(chartContainer.firstChild);
        }
      }
      this.datas.forEach((year:any) => {
        year.datas.forEach((item:any) => {
          if (item.entity == this.selectedEntity) {
            this.data = item.data
            // console.log(this.data);
            if (this.role=='Responsable' && this.entite!=this.selectedEntity) {
              this.graph(this.data, true)
            }else{
              this.graph(this.data, false)
            }
          }
        });
      });
    });

    // this.selects.get('indicateur')?.valueChanges.subscribe((d: any) => {
    //   this.selectedIndic = d
    //   if (this.selectedIndic!='all') {
    //     const newData:any[] = [];
    //     this.data.forEach((indicateur: any) => {
    //       if (indicateur.indicateur === this.selectedIndic) {
    //         newData.push(indicateur);
    //       }
    //     });
    //     this.graph(newData, true);
    //   }else{
    //     this.graph(this.data, true);
    //   }
    // })

    // this.selects.get('indicateur')?.valueChanges.subscribe((d: any[]) => {
    // this.selectedIndic = d;
    //     if (this.selectedIndic.includes('all')) {
    //       this.graph(this.data, true);
    //     } else {
    //         const newData: any[] = [];
    //         this.data.forEach((indicateur: any) => {
    //           if (this.selectedIndic.includes(indicateur.indicateur)) {
    //             newData.push(indicateur);
    //           }
    //         });
    //         // console.log(newData);
    //         this.graph(newData, true);
    //     }
    // })

  }

  ngOnInit() {

    let userStorage = localStorage.getItem('user');
    let use = JSON.parse(userStorage!)
    this.role = use.profil_id.libelle
    // console.log(this.role);

    if (use.entite_id) {
      this.selectedEntity = use.entite_id.sigle
      this.entite = use.entite_id.sigle
    }else{
      this.selectedEntity = 'ARQ'
    }

    if (this.role=='Utilisateur') {
      this.display = true
    }else{
      this.display = false
    }

    this.crud.getDatas().subscribe((d:any)=>{
      this.datas = d;
      this.datas.forEach((year:any) => {
        year.datas.forEach((item:any) => {
          if (item.entity == this.selectedEntity) {
            // console.log(item.data);
            this.data = item.data
            this.graph(this.data, false)
          }
        });
      });
      // console.log(this.datas);
    })
    this.fetchIndicateurs()

    const currentDate = new Date();
    this.dayOfMonth = currentDate.getDate();
    // console.log(this.dayOfMonth);
  }

  graph(data: any, display: boolean) {
    // console.log(data);
    const contain = document.getElementById('charts-container');
    if (contain) {
      contain.innerHTML = '';

      data.forEach((indicateur: any) => {
        const months: string[] = ['Jan-2023', 'Fev-2023', 'Mar-2023', 'Avr-2023', 'Mai-2023', 'Juin-2023', 'Juil-2023', 'Aout-2023', 'Sept-2023', 'Oct-2023', 'Nov-2023', 'Dec-2023'];
        const values: number[] = [];

        Object.keys(indicateur).forEach((key) => {
          if (key !== 'indicateur' && key !== 'objectif' && key!= 'taux' && key !== 'plan' && key !== 'analyse') {
            values.push(parseFloat(indicateur[key]));
          }
        });

        const contain = document.getElementById('charts-container');

        const chartContainer = document.createElement('div');
        chartContainer.classList.add('w-[45%]', 'h-[100%]', 'flex', 'flex-col', 'gap-4',);

        contain?.appendChild(chartContainer);

        const title = document.createElement('h1');
        title.classList.add('font-semibold', 'h-[10%]', 'text-[#FF7900]', 'text-xl');
        title.textContent = indicateur.indicateur;
        chartContainer?.appendChild(title);

        const canvas = document.createElement('canvas');
        canvas.id = 'myChart' + indicateur.indicateur;
        chartContainer?.appendChild(canvas);

        const div = document.createElement('div');
        div.classList.add('flex', 'flex-col', 'w-full', 'h-[100%]')

        const divY = document.createElement('div');
        divY.classList.add('flex', 'gap-4', 'w-full', 'h-[100%]')

        const div1 = document.createElement('div');
        div1.classList.add('flex', 'flex-col', 'gap-2', 'w-[50%]', 'h-[100%]')
        const textarea1 = document.createElement('textarea');
        textarea1.classList.add('w-full', 'h-[100%]', 'p-1', 'border-2', 'rounded-lg', 'border-black')
        textarea1.value = indicateur.analyse
        textarea1.setAttribute('name', 'analyse');
        if (this.display === true || display == true) {
          textarea1.disabled = true;
        }

        const label1 = document.createElement('label');
        label1.classList.add('text-[#FF7900]', 'font-semibold')
        label1.textContent = "Analyse";
        div1.appendChild(label1)
        div1.appendChild(textarea1)

        divY.appendChild(div1)

        const div2 = document.createElement('div');
        div2.classList.add('flex', 'flex-col', 'gap-2', 'w-[50%]', 'h-[100%]')
        const textarea2 = document.createElement('textarea');
        textarea2.classList.add('w-full', 'h-[100%]', 'p-1', 'border-2', 'rounded-lg', 'border-black')
        textarea2.value = indicateur.plan
        textarea2.setAttribute('name', 'plan');
        if (this.display === true || display == true) {
          textarea2.disabled = true;
        }

        const label2 = document.createElement('label');
        label2.classList.add('text-[#FF7900]', 'font-semibold')
        label2.textContent = "Plan d'action";
        div2.appendChild(label2)
        div2.appendChild(textarea2)

        divY.appendChild(div2)
        div.appendChild(divY)

        if (this.role == 'Admin' || (this.dayOfMonth < 10 && (this.role == 'Responsable' || this.role == 'Interim'))) {
        const divX = document.createElement('div');
          const button = document.createElement('button');
          button.className = 'text-[#FF7900] underline px-1 py-1 font-bold text-lg rounded-xl';
          button.textContent = 'enregistrer';
          button.addEventListener('click', () => {
            indicateur.analyse = textarea1.value
            indicateur.plan = textarea2.value

            this.datas.forEach((year:any) => {
              year.datas.forEach((item:any) => {
                if (item.entity == this.selectedEntity) {
                  item.data = data
                }
              });
            });

            this.crud.upData(this.datas).subscribe(data => {
              console.log(data);
              this.toastr.success('Les mises à jour ont été enregistrées avec succès !!');
            })
          });

          divX.appendChild(button)
          // if (this.dayOfMonth > 10 && (this.role == 'Responsable' || this.role == 'Interim')) {
            // divX.style.display = 'none';
          // }

        div.appendChild(divX)
      }
        chartContainer?.appendChild(div);

        new Chart(canvas, {
          type: 'line',
          data: {
            labels: months,
            datasets: [
              {
                label: 'Valeurs',
                data: values,
                backgroundColor: 'black',
                borderColor: '#009081',
                borderWidth: 1
              },
              {
                label: 'Objectif',
                data: Array(months.length).fill(parseFloat(indicateur.objectif)),
                backgroundColor: 'transparent',
                borderColor: 'red',
                borderWidth: 1,
                // borderDash: [5, 5]
              }
            ]
          },
          options: {
            scales:{
              y: {
                suggestedMax: 100,
                ticks: {
                  font: {
                    size: 16
                  }
                }
              },
              x: {
                ticks: {
                  font: {
                    size: 16
                  }
                }
              }
            }
          }
        });
      });
    }
  }

  exportToPowerPoint() {
    const chartContainers = document.querySelectorAll('#charts-container > div');

    if (chartContainers) {
      const pptx = new pptxgen();

      chartContainers.forEach((chartContainer: any) => {
        const canvas = chartContainer.querySelector('canvas') as HTMLCanvasElement;
        if (canvas) {
          const imageUrl = canvas.toDataURL('image/png');
          const title = chartContainer.querySelector('h1')?.textContent || '';
          const analyse = chartContainer.querySelector('textarea[name="analyse"]')?.value || '';
          const plan = chartContainer.querySelector('textarea[name="plan"]')?.value || '';

          this.addSlideToPowerPoint(pptx, imageUrl, title, analyse, plan);
        }
      });

      pptx.writeFile({ fileName: 'presentation.pptx' });
    }
  }

  addSlideToPowerPoint(pptx: any, imageUrl: string, title: string, analyse: string, plan: string): void {
  const slide = pptx.addSlide();

  const slideWidth = 10;
  const slideHeight = 6;

  const imageWidth = slideWidth - 1;
  const imageHeight = slideHeight - 1;
  const imageX = (slideWidth - imageWidth) / 2;
  const imageY = (slideHeight - imageHeight) / 2;

  slide.addImage({ data: imageUrl, x: imageX, y: imageY, w: imageWidth, h: imageHeight });

  slide.addText(title, { x: 0.5, y: 0.1, w: 8, h: 0.5, fontSize: 20, color: 'FF7900', bold: true });

  slide.addText('Analyse:', { x: 0, y: 6, w: 2, h: 0.5, fontSize: 18, bold: true });
  slide.addText(analyse, { x: 0, y: 6, w: 6, h: 2, fontSize: 16, wrapWord: true });

  slide.addText('Plan d\'action:', { x: 6, y: 6, w: 2, h: 0.5, fontSize: 18, bold: true });
  slide.addText(plan, { x: 6, y: 6, w: 6, h: 2, fontSize: 16, wrapWord: true });
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

  toggleSelection(option: string): void {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    } else {
      this.selectedOptions.push(option);
    }
    // console.log(this.selectedOptions);
    let newData:any[] = [];
    this.selectedOptions.forEach((element:any) => {
      this.data.forEach((indicateur: any) => {
        if (indicateur.indicateur == element) {
          newData.push(indicateur);
        }
      });
    });
    this.graph(newData, true);
    // this.graph(this.selectedOptions, true);
  }

  toggleSelectAll(): void {
    this.selectedOptions = [];
    this.graph(this.data, true);
    let modal = document.getElementById('cat')
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openModal()
  {
    let modal = document.getElementById('cat')
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    let modal = document.getElementById('cat')
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
