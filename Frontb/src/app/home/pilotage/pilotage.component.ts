import { CommonModule, formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataService } from '../../_helpers/services/all_methods/data.service';
import {
  Activite,
  Controle,
  Data,
  Departement,
  Direction,
  Pole,
  Service,
  Utilisateur,
  Risque,
  Contry,
} from '../../_helpers/interfaces/data';
import { ControleService } from '../../_helpers/services/all_methods/controle.service';
import { DepartementService } from '../../_helpers/services/all_methods/departement.service';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { PoleService } from '../../_helpers/services/all_methods/pole.service';
import { ServiceService } from '../../_helpers/services/all_methods/service.service';
import { ActiviteService } from '../../_helpers/services/all_methods/activite.service';
import { RisqueService } from '../../_helpers/services/all_methods/risque.service';
import { UtilisateurService } from '../../_helpers/services/all_methods/utilisateur.service';
import Swal from 'sweetalert2';
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
import { ContryService } from '../../_helpers/services/all_methods/contry.service';
import { Contry2Pipe } from '../../_helpers/pipes/contry2.pipe';
import { TypeControle } from '../../_helpers/interfaces/data';
import { TypeService } from '../../_helpers/services/all_methods/type.service';
import { TypePipe } from '../../_helpers/pipes/type.pipe';
import { AnneePipe } from '../../_helpers/pipes/annee.pipe';
import { ImportService } from '../../_helpers/import.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../_helpers/services/auth.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-pilotage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnneePipe,
    SweetAlert2Module,
    TypePipe,
    StatutPipe,
    ValidatePipe,
    PeriodicitePipe,
    RisquePipe,
    ControlePipe,
    CommonModule,
    ActivitePipe,
    Direction2Pipe,
    Departement2Pipe,
    CouverturePipe,
    PorteurPipe,
    PolectrlPipe,
    Service2Pipe,
    Contry2Pipe,
  ],
  templateUrl: './pilotage.component.html',
  styleUrl: './pilotage.component.css',
})
export class PilotageComponent implements AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  ngAfterViewInit() {
    // Assurez-vous que fileInput est défini avant de l'utiliser
    if (!this.fileInput) {
      console.error('File input element is not defined.');
    }
  }
  title: string = 'Nouveau control';
  btn: string = 'Ajouter';
  ctrls: Controle[] = [];
  uploading = false;
  uploadStatus: string | null = null;
  id!: number | null;
  selectedDir: number = 0;
  selectedDept: number = 0;
  selectedCouv: number = 0;
  selectedUser: number = 0;
  selectedPole!: number|null ;
  selectedServ: number = 0;
  selectedAct: number = 0;
  selectedCtrl: number = 0;
  selectedRisk: number = 0;
  selectedPrd: number = 0;
  selectedStat: number = 0;
  selectedVal: number = 0;
  selectedType: number = 0;
  selectedContry: number = 0;
  selectedYear: number = 0;
  display2: boolean = false;

  fileToUpload: File | null = null;

  control: boolean = true;
  archive: boolean = false;
  hoveredIcon: { [id: number]: string | null } = {};
  selectedFile: any;
  selectedFiles: File[] = [];
  files: File[] = [];
  fileCount: number = 0;

  display: boolean = false;
  file: any;
 
    fileNames: string = '';
  formData: FormData = new FormData();
  formData2: FormData = new FormData();

  toExp: any[] = [];

  types: Signal<TypeControle[]> = signal([]);
  datas: Signal<Data[]> = signal([]);
  controles: Signal<Controle[]> = signal([]);
  archives: Signal<Controle[]> = signal([]);
  directions: Signal<Direction[]> = signal([]);
  poles: Signal<Pole[]> = signal([]);
  departements: Signal<Departement[]> = signal([]);
  services: Signal<Service[]> = signal([]);
  activites: Signal<Activite[]> = signal([]);
  users: Signal<Utilisateur[]> = signal([]);
  risques: Signal<Risque[]> = signal([]);
  contries: Signal<Contry[]> = signal([]);

  Data!: FormGroup;
  select!: FormGroup;
  profileUser!:number;
  pays_id!:number;

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
    private contryService: ContryService,
    private type: TypeService,
    private importService: ImportService,
    private authService: AuthService
  )
   {
    this.Data = this.fb.group({
      controle: this.fb.control(''),
      code: this.fb.control(''),
      objectif: this.fb.control(''),
      descriptif: this.fb.control(''),
      type: this.fb.control(''),
      direction_id: this.fb.control(1),
      pole_id: this.fb.control(''),
      departement_id: this.fb.control(1),
      service_id: this.fb.control(1),
      activite_id: this.fb.control(1),
      commentaire: this.fb.control(''),
      risque_id: this.fb.control(0),
      user_id: this.fb.control(1),
      periodicite: this.fb.control('saisir la périodicité'),
      exhaustivite: this.fb.control(0),
      preuve: this.fb.control('P1'),
      etat: this.fb.control(''),
    });

    // this.Data.get('controle_id')?.valueChanges.subscribe((d)=>{
    //   let code = this.ctrls.filter((c:any) => c.id == d)[0]
    //   this.Data.patchValue({code: code.code})
    // })

    this.select = this.fb.group({
      pays_id: this.fb.control(0),
      type: this.fb.control(''),
      direction_id: this.fb.control(0),
      departement_id: this.fb.control(0),
      pole_id: this.fb.control(null),
      service_id: this.fb.control(0),
      activite_id: this.fb.control(0),
      controle_id: this.fb.control(0),
      risque_id: this.fb.control(0),
      user_id: this.fb.control(0),
      periodicite: this.fb.control(0),
      couverture: this.fb.control(0),
      statut: this.fb.control(''),
      validate: this.fb.control(0),
      annee: this.fb.control(0),
    });

    this.select.get('direction_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedDir = res;
    });

    this.select.get('type')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedType = res;
    });

    this.select.get('departement_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedDept = res;
    });

    this.select.get('pole_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedPole = res;
    });

    this.select.get('service_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedServ = res;
    });

    this.select.get('activite_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedAct = res;
    });

    this.select.get('risque_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedRisk = res;
    });

    this.select.get('pays_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedContry = res;
    });

    this.select.get('controle_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedCtrl = res;
    });

    this.select.get('user_id')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedUser = res;
    });

    this.select.get('couverture')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedCouv = res;
    });

    this.select.get('periodicite')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedPrd = res;
    });

    this.select.get('statut')?.valueChanges.subscribe((res) => {
       console.log(res);
      this.selectedStat = res;
    });

    this.select.get('validate')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedVal = res;
    });

    this.select.get('annee')?.valueChanges.subscribe((res) => {
      // console.log(res);
      this.selectedYear = res;
    });

    // console.log(this.toExp)
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    //  console.log(userObj);

    const profil = userObj.profil_id;
    this.profileUser=profil;
    this.pays_id=userObj.pays_id;

    //  console.log(profil);
    if (profil != 1) {
      this.display2 = true;
      this.getData();
      //  console.log(this.getData());
    } else {
      this.getData2();
      // this.Data.
    }
    this.getControles();
    this.getDepart();
    this.getDirections();
    this.getPoles();
    this.getActivites();
    this.getServices();
    this.getUsers();
    this.getRisques();
    this.getContries();
    this.getTypes();

    let direct = localStorage.getItem('direction');
    let direction = JSON.parse(direct!);
    // console.log(direction);

    let card = localStorage.getItem('etat');
    let etat = JSON.parse(card!);
    // console.log(etat);

    if (direction && etat) {
      this.data.listResources().subscribe((res: any) => {
        // this.toExp = res.controles
        // console.log(this.toExp);
        let ctrls = res.controles.filter(
          (c: any) => c.direction_id.libelle == direction
        );
        let directId = ctrls[0].direction_id.id;
        // console.log(directId);
        let et: string | number = 0;
        let val: string | number = 0;

        if (etat == 'totalValidated') {
          val = 'Validé';
        } else if (etat == 'totalNonValidated') {
          val = 'Non validé';
        } else if (etat == 'totalDone') {
          et = 'Fait';
        } else if (etat == 'totalNotDone') {
          et = 'Non fait';
        } else if (etat == 'totalApplicable') {
          et = 'Applicable';
        } else if (etat == 'totalNonApplicable') {
          et = 'Non applicable';
        }else if (etat == 'totalTransfer') {
          et = 'Transferer';
        }

        this.select.patchValue({
          direction_id: directId,
          statut: et,
          validate: val,
        });
      });
    }
    this.disableAllFields(profil);
  }

  getContries() {
    this.contryService.listResources().subscribe((res: any) => {
      this.contries = signal(res.data);
      // console.log(res);
    });
  }

  getUsers() {
    this.userService.listResources().subscribe((res: any) => {
      this.users = signal(res.data);
      // console.log(res.data);
    });
  }

  getData() {
    this.data.listResources().subscribe((res: any) => {
      this.toExp = res.controles;
      this.datas = signal(res.controles);
      // console.log(this.datas())
      this.archives = signal(res.archives);
      // console.log(this.toExp[0].date_ajout);
    });
  }

  getData2() {
    this.data.listResources().subscribe((res: any) => {
      // console.log(res.controles);
      this.toExp = res.controles.filter(
        (res: any) => res.user_id.profil_id.id == 1
      );
      // console.log(this.toExp);
      const arch = res.archives.filter(
        (res: any) => res.user_id.profil_id.id == 1
      );

      this.datas = signal(this.toExp);
      this.archives = signal(arch);
      // console.log(this.toExp[0].date_ajout);
    });
  }

  getPoles() {
    this.poleService.listResources().subscribe((r) => {
      this.poles = signal(r);
    });
  }

  disableAllFields(profil:number) {
    Object.keys(this.Data.controls).forEach(field => {
      const control = this.Data.get(field);
      if(field!=="preuve" && field!=="commentaire" &&   field!=="etat" && profil==1){

        control?.disable();
      }
    });
    

  }
  getServices() {
    this.servService.listResources().subscribe((r) => {
      this.services = signal(r);
      // console.log(r);
    });
  }

  getActivites() {
    this.actService.listResources().subscribe((r) => {
      this.activites = signal(r);
    });
  }

  getDirections() {
    this.dirService.listResources().subscribe((r) => {
      this.directions = signal(r);
    });
  }

  getDepart() {
    this.depart.listResources().subscribe((r) => {
      this.departements = signal(r);
      // console.log(r);
    });
  }

  getControles() {
    this.ctrl.listResources().subscribe((r:any) => {
      console.log(r);
      
      this.controles = signal(r?.data)
      this.ctrls = r?.data
       console.log(r?.data);
    })
  }

  getTypes() {
    this.type.listResources().subscribe((r: any) => {
      this.types = signal(r.types);
      // console.log(r);
    });
  }

  getRisques() {
    this.risk.listResources().subscribe((r: any) => {
      this.risques = signal(r.risques);
      // this.ctrls = r.controles
      // console.log(r.controles);
    });
  }

  selectControle() {
    this.control = true;
    this.archive = false;
  }

  selectArchive() {
    this.control = false;
    this.archive = true;
  }
  
  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     this.files = Array.from(input.files); // Convertit les fichiers en tableau
  //     this.fileCount = this.files.length;   // Met à jour le compteur
  //     this.fileNames = this.files.map(file => file.name).join(', ');
  //    console.log(this.fileNames);
     
  //     // Noms des fichiers
  //   }
  // }

      // Tableau pour stocker les fichiers sélectionnés
     // Compteur de fichiers

     onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        const selectedFiles = Array.from(input.files); // Convertit les fichiers en tableau
        this.files.push(...selectedFiles); // Ajoute les nouveaux fichiers au tableau existant
        this.fileCount = this.files.length;   // Met à jour le compteur
      }
    }

  openFile(file: File) {
    const fileURL = URL.createObjectURL(file); // Crée une URL pour le fichier
    window.open(fileURL, '_blank'); // Ouvre l'URL dans un nouvel onglet
  }

  // openFile(file: File) {
  //   const fileURL = URL.createObjectURL(file);
  //   window.open(fileURL); // Ouvre le fichier dans un nouvel onglet
  // }
  

  addOrUp() {
    // console.log(this.Data.value);
    if (this.btn == 'Ajouter') {
      this.formData.append('controle', this.Data.get('controle')?.value);
      this.formData.append('code', this.Data.get('code')?.value);
      this.formData.append('descriptif', this.Data.get('descriptif')?.value);
      this.formData.append('objectif', this.Data.get('objectif')?.value);
      this.formData.append('type', this.Data.get('type')?.value);
      this.formData.append('periodicite', this.Data.get('periodicite')?.value);
      this.formData.append(
        'exhaustivite',
        this.Data.get('exhaustivite')?.value
      );
      this.formData.append('preuve', this.Data.get('preuve')?.value);
      this.formData.append('etat', this.Data.get('etat')?.value);
      this.formData.append('commentaire', this.Data.get('commentaire')?.value);
      this.formData.append('risque_id', this.Data.get('risque_id')?.value);
      this.formData.append(
        'direction_id',
        this.Data.get('direction_id')?.value
      );
      this.formData.append('service_id', this.Data.get('service_id')?.value);
      const poleIdValue    = this.formData.append('pole_id', this.Data.get('pole_id')?.value);
      if (poleIdValue !== null && poleIdValue !== undefined) {
        this.formData.append('pole_id', poleIdValue);
    } else {
        // Vous pouvez décider d'ajouter 'null' en tant que chaîne ou simplement ignorer l'ajout
        this.formData.append('pole_id', ''); // ou ne rien ajouter si votre backend préfère ne pas recevoir ce champ du tout
    }
      this.formData.append('activite_id', this.Data.get('activite_id')?.value);
      this.formData.append(
        'departement_id',
        this.Data.get('departement_id')?.value
      );
      this.formData.append('user_id', this.Data.get('user_id')?.value);
      // this.formData.append('fichier', this.selectedFile);
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file: File, index: number) => {
          this.formData.append(`fichier[${index}]`, file, file.name);
        });
      }

      this.data.addResources(this.formData).subscribe((d: any) => {
        // console.log(d);
        if (d.message) {
          this.getData();
          this.Data.reset();
          this.closeModal();
          Swal.fire({
            title: 'Succes!',
            text: d.message,
            icon: 'success',
          });
        } else if (d.error) {
          Swal.fire({
            title: 'Error!',
            text: d.error,
            icon: 'error',
          });
        }
      });
    } else if (this.btn == 'Modifier') {
      this.formData.append('controle', this.Data?.get('controle')?.value);
      this.formData.append('code', this.Data?.get('code')?.value);
      this.formData.append('descriptif', this.Data?.get('descriptif')?.value);
      this.formData.append('objectif', this.Data?.get('objectif')?.value);
      this.formData.append('type', this.Data?.get('type')?.value);
      this.formData.append('periodicite', this.Data?.get('periodicite')?.value);
      this.formData.append(
        'exhaustivite',
        this.Data.get('exhaustivite')?.value
      );
      this.formData.append('preuve', this.Data.get('preuve')?.value);
      this.formData.append('etat', this.Data.get('etat')?.value);
      this.formData.append('commentaire', this.Data.get('commentaire')?.value);
      this.formData.append('risque_id', this.Data.get('risque_id')?.value);
      this.formData.append(
        'direction_id',
        this.Data.get('direction_id')?.value
      );
      this.formData.append('service_id', this.Data.get('service_id')?.value);
      this.formData.append('pole_id', this.Data.get('pole_id')?.value);
      this.formData.append('activite_id', this.Data.get('activite_id')?.value);
      this.formData.append(
        'departement_id',
        this.Data.get('departement_id')?.value
      );
      this.formData.append('user_id', this.Data.get('user_id')?.value);
      // if (this.selectedFile) {
      //   this.formData.append('fichier', this.selectedFile);
      // }
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file: File, index: number) => {
          this.formData.append(`fichier[${index}]`, file, file.name);
        });
      }

      this.data.updateResources(this.id, this.formData).subscribe((d: any) => {
        // console.log(d);
        if (d.message) {
          this.getData();
          this.Data.reset();
          this.closeModal();
          Swal.fire({
            title: 'Succes!',
            text: d.message,
            icon: 'success',
          });
        } else if (d.error) {
          Swal.fire({
            title: 'Error!',
            text: d.error,
            icon: 'error',
          });
        }
      });
    } else {
      this.closeModal();
    }
    this.selectedFiles = [];
  }

  openModal() {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Nouveau control';
      this.btn = 'Ajouter';
      modal.style.display = 'block';
    }
  }

  editModal(data: any) {
    let modal = document.getElementById('modal');
    if (modal) {
      this.title = 'Modification control';
      this.btn = 'Modifier';
      modal.style.display = 'block';
      this.id = data.id;
      this.Data.patchValue({
        controle: data.controle,
        code: data.code,
        descriptif: data.descriptif,
        objectif: data.objectif,
        type: data.type_controle_id.id,
        direction_id: data.direction_id.id,
        pole_id: data.pole_id.id,
        departement_id: data.departement_id.id,
        service_id: data.service_id.id,
        activite_id: data.activite_id.id,
        commentaire: data.commentaire,
        risque_id: data.risque_id.id,
        user_id: data.user_id.id,
        periodicite: data.periodicite,
        exhaustivite: data.exhaustivite,
        preuve: data.preuve,
        // fichier: data.fichier,
        etat: data.etat,
      });
    }
  }

  info(data: any) {
    let modal = document.getElementById('modal');
    if (modal) {
        this.display = true;
        this.title = 'Information control';
        this.btn = 'Fermer';

        if (data.fichier) {
            this.files = JSON.parse(data.fichier).map(
                (filePath: string) => 'http://localhost:8000/storage/' + filePath
            );
            this.fileCount = this.files.length;
        } else {
            this.files = [];
        }

        this.Data.patchValue({
            controle: data.controle,
            code: data.code,
            descriptif: data.descriptif,
            objectif: data.objectif,
            type: data.type ?? null,
            direction_id: data.direction_id?.id ?? null,
            pole_id: data.pole_id?.id ?? null,
            departement_id: data.departement_id?.id ?? null,
            service_id: data.service_id?.id ?? null,
            activite_id: data.activite_id?.id ?? null,
            commentaire: data.commentaire,
            risque_id: data.risque_id?.id ?? null,
            user_id: data.user_id?.id ?? null,
            periodicite: data.periodicite,
            exhaustivite: data.exhaustivite,
            preuve: data.preuve,
            etat: data.etat,
        });

        this.Data.disable();
        modal.style.display = 'block';
    }
}


  deleteD(id: number | null) {
    Swal.fire({
      title: "Voulez-vous confirmer l'archivage ?",
      showDenyButton: true,
      confirmButtonText: 'Archiver',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.deleteResource(id).subscribe((d: any) => {
          if (d.message) {
            this.getData();
            Swal.fire({
              title: 'Succes!',
              text: d.message,
              icon: 'success',
            });
          } else if (d.error) {
            Swal.fire({
              title: 'Error!',
              text: d.error,
              icon: 'error',
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("L'archivage a été annulée", '', 'info');
      }
    });
  }

  desarchiver(id: number | null) {
    Swal.fire({
      title: 'Voulez-vous confirmer le désarchivage ?',
      showDenyButton: true,
      confirmButtonText: 'Désarchiver',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.desarchiverResource(id).subscribe((d: any) => {
          if (d.message) {
            this.getData();
            Swal.fire({
              title: 'Succes!',
              text: d.message,
              icon: 'success',
            });
          } else if (d.error) {
            Swal.fire({
              title: 'Error!',
              text: d.error,
              icon: 'error',
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Le désarchivage a été annulée', '', 'info');
      }
    });
  }

  validate(id: number | null) {
    Swal.fire({
      title: 'Voulez-vous confirmer la validation?',
      showDenyButton: true,
      confirmButtonText: 'Valider',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.validateResource(id).subscribe((d: any) => {
          if (d.message) {
            this.getData();
            Swal.fire({
              title: 'Succes!',
              text: d.message,
              icon: 'success',
            });
          } else if (d.error) {
            Swal.fire({
              title: 'Error!',
              text: d.error,
              icon: 'error',
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire('La validation a été annulée', '', 'info');
      }
    });
  }

  invalidate(id: number | null) {
    Swal.fire({
      title: 'Voulez-vous annuler la validation?',
      showDenyButton: true,
      confirmButtonText: 'Dévalider',
      denyButtonText: `Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.invalidateResource(id).subscribe((d: any) => {
          if (d.message) {
            this.getData();
            Swal.fire({
              title: 'Succes!',
              text: d.message,
              icon: 'success',
            });
          } else if (d.error) {
            Swal.fire({
              title: 'Error!',
              text: d.error,
              icon: 'error',
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire('La dévalidation a été annulée', '', 'info');
      }
    });
  }

  setHoveredIcon(id: number, icon: string) {
    this.hoveredIcon[id] = icon;
  }

  clearHoveredIcon(id: number) {
    this.hoveredIcon[id] = null;
  }

  closeModal() {
    let modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
      this.Data.enable();
      this.display = false;
      // this.selectedFile = undefined;
      this.selectedFiles = [];
      !this.fileCount;
    }
  }

  exportExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.columns = [
      { header: 'Type controle', key: 'type', width: 20 },
      { header: 'Direction', key: 'direction', width: 20 },
      { header: 'Pôle', key: 'pole', width: 20 },
      { header: 'Département', key: 'departement', width: 20 },
      { header: 'Service', key: 'service', width: 20 },
      { header: 'Activité/Domaine', key: 'activite', width: 20 },
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
      cell.font = {
        name: 'Arial',
        size: 12,
        bold: true,
        color: { argb: 'FFFFFF' },
      }; // Texte en blanc
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7900' },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    this.toExp.forEach((data: any) => {
      console.log(data);

      const row = worksheet.addRow({
        type: data.type_controle_id.libelle ? data.type_controle_id.libelle :'Non défini',
        direction: data.direction_id.libelle,
        pole: data.pole_id && data.pole_id.libelle ? data.pole_id.libelle : 'Non défini',
        departement: data.departement_id.libelle,
        service: data.service_id.libelle,
        activite: data.activite_id.libelle,
        code: data.code,
        controle: data.controle,
        objectif: data.objectif,
        descriptif: data.descriptif,
        risque: data.risque_id.libelle,
        porteur: data.user_id.nom_complet,
        periodicite: data.periodicite,
        exhaustivite: data.exhaustivite,
        preuve: data.preuve,
        commentaire: data.commentaire,
        statut: data.validate ? data.validate:'Non defini',
        etat: data.etat?data.etat:'Non défini',
        date_ajout: data.date_ajout,
      });

      row.eachCell((cell) => {
        cell.alignment = {
          wrapText: true,
          vertical: 'middle',
          horizontal: 'left',
        };
      });

      const lineHeight = 80;
      row.height = lineHeight;
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'ExportedData.xlsx');
    });
  }

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0] as File;
  // }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.onSubmit();
    }
  }
  onSubmit() {
    if (this.selectedFile) {
      this.importService.uploadFile(this.selectedFile).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploading = true;
        } else if (event.type === HttpEventType.Response) {
          this.uploading = false;
          this.uploadStatus = 'Importation réussie !';
        }
      }, error => {
        this.uploading = false;
        this.uploadStatus = 'Erreur lors de l\'importation.';
        console.error(error);
      });
    }
  }


  onUpload(): void {
    if (this.selectedFile) {
      this.importService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log('Fichier importé avec succès :', response);
          // Gérer la réponse de succès ici
        },
        (error) => {
          console.error("Erreur lors de l'importation du fichier :", error);
          // Gérer l'erreur ici
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }

  uploadFile(file: File) {
    this.importService
      .uploadFile(file)
      .pipe(
        catchError((error: any) => {
          console.error("Erreur lors de l'envoi du fichier", error);
          let errorMessage = 'Erreur inconnue';
          if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            errorMessage = `Erreur : ${error.error.message}`;
          } else {
            // Erreur côté serveur
            errorMessage = `Erreur HTTP : ${error.status}\nMessage : ${error.message}`;
          }

          return throwError(errorMessage);
        })
      )
      .subscribe((data) => {
        console.log('Fichier envoyé avec succès', data);
      });
  }
  // openFile(file: File) {
  //   if (file) {
  //     const fileURL = URL.createObjectURL(file); // Crée une URL pour le fichier
  //     window.open(fileURL, '_blank'); // Ouvre l'URL dans un nouvel onglet
  //   } else {
  //     console.error('Le fichier est introuvable ou l\'URL est incorrecte.');
  //   }
  // }
  
  
}
