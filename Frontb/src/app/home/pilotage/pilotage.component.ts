import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataService } from '../../_helpers/services/all_methods/data.service';
import { Activite, Controle, Data, Departement, Direction, Pole, Service, Utilisateur, Risque } from '../../_helpers/interfaces/data';
import { ControleService } from '../../_helpers/services/all_methods/controle.service';
import { DepartementService } from '../../_helpers/services/all_methods/departement.service';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { PoleService } from '../../_helpers/services/all_methods/pole.service';
import { ServiceService } from '../../_helpers/services/all_methods/service.service';
import { ActiviteService } from '../../_helpers/services/all_methods/activite.service';
import { RisqueService } from '../../_helpers/services/all_methods/risque.service';
import { UtilisateurService } from '../../_helpers/services/all_methods/utilisateur.service';
import Swal from 'sweetalert2'
import { Direction2Pipe } from '../../_helpers/pipes/direction2.pipe';
import { Departement2Pipe } from '../../_helpers/pipes/departement2.pipe';
import { CouverturePipe } from '../../_helpers/pipes/couverture.pipe';
import { PorteurPipe } from '../../_helpers/pipes/porteur.pipe';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { PolectrlPipe } from '../../_helpers/pipes/polectrl.pipe';
import { Service2Pipe } from '../../_helpers/pipes/service2.pipe';
import { ActivitePipe } from '../../_helpers/pipes/activite.pipe';
import { ControlePipe } from '../../_helpers/pipes/controle.pipe';
import { RisquePipe } from '../../_helpers/pipes/risque.pipe';
import { PeriodicitePipe } from '../../_helpers/pipes/periodicite.pipe';
import { StatutPipe } from '../../_helpers/pipes/statut.pipe';
import { ValidatePipe } from '../../_helpers/pipes/validate.pipe';


@Component({
  selector: 'app-pilotage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module, StatutPipe, ValidatePipe, PeriodicitePipe, RisquePipe, ControlePipe, CommonModule, ActivitePipe, Direction2Pipe, Departement2Pipe, CouverturePipe, PorteurPipe, PolectrlPipe, Service2Pipe],
  templateUrl: './pilotage.component.html',
  styleUrl: './pilotage.component.css'
})
export class PilotageComponent {

  title: string = 'Nouveau control'
  btn: string = 'Ajouter'
  ctrls: Controle[] = [];
  id!: number | null
  selectedDir: number = 0
  selectedDept: number = 0
  selectedCouv: number = 0
  selectedUser: number = 0
  selectedPole: number = 0
  selectedServ: number = 0
  selectedAct: number = 0
  selectedCtrl: number = 0
  selectedRisk: number = 0
  selectedPrd: number = 0
  selectedStat: number = 0
  selectedVal: number = 0

  control: boolean = true
  archive: boolean = false
  hoveredIcon: string | null = null;

  toExp: any[] = [];
  datas: Signal<Data[]> = signal([])
  controles: Signal<Controle[]> = signal([])
  archives: Signal<Controle[]> = signal([])
  directions: Signal<Direction[]> = signal([])
  poles: Signal<Pole[]> = signal([])
  departements: Signal<Departement[]> = signal([])
  services: Signal<Service[]> = signal([])
  activites: Signal<Activite[]> = signal([])
  users: Signal<Utilisateur[]> = signal([])
  risques: Signal<Risque[]> = signal([])

  Data!: FormGroup
  select!: FormGroup

  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private ctrl: ControleService,
    private risk: RisqueService,
    private depart: DepartementService,
    private dirService: DirectionService,
    private poleService: PoleService,
    private servService: ServiceService,
    private actService: ActiviteService,
    private userService: UtilisateurService,
  ) {
    this.Data = this.fb.group({
      nom: this.fb.control('Control 1'),
      code: this.fb.control('Code 1'),
      direction_id: this.fb.control(1),
      pole_id: this.fb.control(1),
      departement_id: this.fb.control(1),
      service_id: this.fb.control(1),
      activite_id: this.fb.control(1),
      objectif: this.fb.control('O1'),
      descriptif: this.fb.control('D1'),
      commentaire: this.fb.control('C1'),
      risque_id: this.fb.control(0),
      user_id: this.fb.control(1),
      periodicite: this.fb.control('saisir la périodicité'),
      exhaustivite: this.fb.control(0),
      preuve: this.fb.control('P1'),
      fichier: this.fb.control(''),
      etat: this.fb.control('none')
    })

    this.Data.get('controle_id')?.valueChanges.subscribe((d)=>{
      let code = this.ctrls.filter((c:any) => c.id == d)[0]
      this.Data.patchValue({code: code.code})
    })

    this.select = this.fb.group({
      direction_id: this.fb.control(0),
      departement_id: this.fb.control(0),
      pole_id: this.fb.control(0),
      service_id: this.fb.control(0),
      activite_id: this.fb.control(0),
      nom: this.fb.control(0),
      risque_id: this.fb.control(0),
      user_id: this.fb.control(0),
      periodicite: this.fb.control(0),
      couverture: this.fb.control(0),
      statut: this.fb.control(0),
      validate: this.fb.control(0),
    });

    this.select.get('nom')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedCtrl = res
    })

    this.select.get('direction_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedDir = res
    })

    this.select.get('departement_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedDept = res
    })

    this.select.get('pole_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedPole = res
    })

    this.select.get('service_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedServ = res
    })

    this.select.get('activite_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedAct = res
    })

    this.select.get('risque_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedRisk = res
    })

    this.select.get('user_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedUser = res
    })

    this.select.get('couverture')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedCouv = res
    })

    this.select.get('periodicite')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedPrd = res
    })

    this.select.get('statut')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedStat = res
    })

    this.select.get('validate')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedVal = res
    })

  }

  ngOnInit() {
     this.getData()
    // this.getControles()
    // this.getDepart()
    // this.getDirections()
    // this.getPoles()
    // this.getActivites()
    // this.getServices()
    // this.getUsers()
    // this.getRisques()
  }

  getUsers()
  {
    this.userService.listResources().subscribe((res:any) => {
      this.users = signal(res.data)
      // console.log(res.data);
    })
  }

  getData()
  {
    this.data.listResources().subscribe((res:any)=>{
      this.datas = signal(res.controles);
      this.archives = signal(res.archives);
      this.toExp = res.data
      console.log(res);
    })
  }

  getPoles()
  {
    this.poleService.listResources().subscribe(r => {
      this.poles = signal(r)
    })
  }

  getServices()
  {
    this.servService.listResources().subscribe(r => {
      this.services = signal(r)
      // console.log(r);
    })
  }

  getActivites()
  {
    this.actService.listResources().subscribe(r => {
      this.activites = signal(r)
    })
  }

  getDirections()
  {
    this.dirService.listResources().subscribe(r => {
      this.directions = signal(r)
    })
  }

  getDepart()
  {
    this.depart.listResources().subscribe(r => {
      this.departements = signal(r)
      // console.log(r);
    })
  }

  getControles()
  {
    this.ctrl.listResources().subscribe((r:any) => {
      this.controles = signal(r.controles)
      this.ctrls = r.controles
      // console.log(r.controles);
    })
  }

  getRisques()
  {
    this.risk.listResources().subscribe((r:any) => {
      this.risques = signal(r.risques)
      // this.ctrls = r.controles
      // console.log(r.controles);
    })
  }

  selectControle()
  {
    this.control = true;
    this.archive = false
  }

  selectArchive()
  {
    this.control = false;
    this.archive = true
  }

  addOrUp()
  {
    // console.log(this.Data.value);
    if (this.btn == 'Ajouter') {
      this.data.addResources(this.Data.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getData()
          this.Data.reset()
          this.closeModal()
          Swal.fire({
            title: "Succes!",
            text: d.message,
            icon: "success"
          });
        }else if(d.error){
          Swal.fire({
            title: "Error!",
            text: d.error,
            icon: "error"
          });
        }
      })
    }else if(this.btn == 'Modifier'){
      this.data.updateResources(this.id, this.Data.value).subscribe((d:any)=>{
        // console.log(d);
        if (d.message) {
          this.getData()
          this.Data.reset()
          this.closeModal()
          Swal.fire({
            title: "Succes!",
            text: d.message,
            icon: "success"
          });
        }else if(d.error){
          Swal.fire({
            title: "Error!",
            text: d.error,
            icon: "error"
          });
        }
      })
    }else{
      this.closeModal()
    }
  }

  openModal()
  {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Nouveau control'
      this.btn = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal(data: any)
  {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Modification control'
      this.btn = 'Modifier'
      modal.style.display = 'block';
      this.id = data.id
      this.Data.patchValue({
        nom: data.nom,
        direction_id: data.direction_id.id,
        pole_id: data.pole_id.id,
        departement_id: data.departement_id.id,
        service_id: data.service_id.id,
        activite_id: data.activite_id.id,
        code: data.code,
        commentaire: data.commentaire,
        descriptif: data.descriptif,
        objectif: data.objectif,
        risque_id: data.risque_id.id,
        user_id: data.user_id.id,
        periodicite: data.periodicite,
        exhaustivite: data.exhaustivite,
        preuve: data.preuve,
        fichier: data.fichier,
        etat: data.etat,
      })
    }
  }

  info(data: any)
  {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Information control'
      this.btn = 'Fermer'
      this.Data.patchValue({
        nom: data.nom,
        direction_id: data.direction_id.id,
        pole_id: data.pole_id.id,
        departement_id: data.departement_id.id,
        service_id: data.service_id.id,
        activite_id: data.activite_id.id,
        code: data.code,
        commentaire: data.commentaire,
        descriptif: data.descriptif,
        objectif: data.objectif,
        risque_id: data.risque_id.id,
        user_id: data.user_id.id,
        periodicite: data.periodicite,
        exhaustivite: data.exhaustivite,
        preuve: data.preuve,
        fichier: data.fichier,
        etat: data.etat,
      })
      this.Data.disable()
      modal.style.display = 'block';
    }
  }

  deleteD(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer l'archivage ?",
      showDenyButton: true,
      confirmButtonText: "Archiver",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getData()
            Swal.fire({
              title: "Succes!",
              text: d.message,
              icon: "success"
            });
          }else if(d.error){
            Swal.fire({
              title: "Error!",
              text: d.error,
              icon: "error"
            });
          }
        });
      }else if(result.isDenied) {
        Swal.fire("L'archivage a été annulée", "", "info");
      }
    });
  }

  desarchiver(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer le désarchivage ?",
      showDenyButton: true,
      confirmButtonText: "Désarchiver",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.desarchiverResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getData()
            Swal.fire({
              title: "Succes!",
              text: d.message,
              icon: "success"
            });
          }else if(d.error){
            Swal.fire({
              title: "Error!",
              text: d.error,
              icon: "error"
            });
          }
        });
      }else if(result.isDenied) {
        Swal.fire("Le désarchivage a été annulée", "", "info");
      }
    });
  }

  validate(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la validation?",
      showDenyButton: true,
      confirmButtonText: "Valider",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.validateResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getData()
            Swal.fire({
              title: "Succes!",
              text: d.message,
              icon: "success"
            });
          }else if(d.error){
            Swal.fire({
              title: "Error!",
              text: d.error,
              icon: "error"
            });
          }
        });
      }else if(result.isDenied) {
        Swal.fire("La validation a été annulée", "", "info");
      }
    });
  }

  closeModal()
  {
    let modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
      this.Data.enable()
    }
  }

  exportExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.columns = [
      { header: 'Direction', key: 'direction', width: 20 },
      { header: 'Pôle', key: 'pole', width: 20 },
      { header: 'Département', key: 'departement', width: 20 },
      { header: 'Service', key: 'service', width: 20 },
      { header: 'Activité', key: 'activite', width: 20 },
      { header: 'Code', key: 'code', width: 15 },
      { header: 'Contrôle', key: 'controle', width: 30 },
      { header: 'Objectif', key: 'objectif', width: 30 },
      { header: 'Descriptif', key: 'descriptif', width: 30 },
      { header: 'Risque Couvert', key: 'risque', width: 30 },
      { header: 'Porteur', key: 'porteur', width: 20 },
      { header: 'Périodicité', key: 'periodicite', width: 15 },
      { header: 'Exhaustivité', key: 'exhaustivite', width: 15 },
      { header: 'Preuve', key: 'preuve', width: 30 },
      { header: 'Commentaire', key: 'commentaire', width: 30 },
      { header: 'Statut', key: 'statut', width: 30 },
      { header: 'Etat', key: 'etat', width: 30 },
      { header: 'Date ajout', key: 'date_ajout', width: 30 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FFFFFF' } }; // Texte en blanc
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7900' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    this.toExp.forEach((data: any) => {
      const row = worksheet.addRow({
        direction: data.direction_id.libelle,
        pole: data.pole_id.libelle,
        departement: data.departement_id.libelle,
        service: data.service_id.libelle,
        activite: data.activite_id.libelle,
        code: data.code,
        controle: data.nom,
        objectif: data.objectif,
        descriptif: data.descriptif,
        risque: data.risque_id.libelle,
        porteur: data.user_id.nom_complet,
        periodicite: data.periodicite,
        exhaustivite: data.exhaustivite,
        preuve: data.preuve,
        commentaire: data.commentaire,
        statut: data.validate,
        etat: data.etat,
        date_ajout: data.date_ajout,

      });

      row.eachCell((cell) => {
        cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'left' };
      });

      const lineHeight = 80;
      row.height = lineHeight;
    });


    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'ExportedData.xlsx');
    });
  }

}
