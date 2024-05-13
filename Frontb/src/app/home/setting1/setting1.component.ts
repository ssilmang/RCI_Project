import { Component, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Direction, Pole } from '../../_helpers/interfaces/data';
import { DirectionService } from '../../_helpers/services/all_methods/direction.service';
import { PoleService } from '../../_helpers/services/all_methods/pole.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'
import { DirectionPipe } from "../../_helpers/pipes/direction.pipe";


@Component({
    selector: 'app-setting1',
    standalone: true,
    templateUrl: './setting1.component.html',
    styleUrl: './setting1.component.css',
    providers: [DirectionService],
    imports: [ReactiveFormsModule, FormsModule, SweetAlert2Module, DirectionPipe]
})
export class Setting1Component {

  btn: string = 'Ajouter'
  button!: string
  title: string = 'Modification pole'
  idDir!: number | null
  idPole!: number | null
  directions: Signal<Direction[]> = signal([])
  poles: Signal<Pole[]> = signal([])
  selectedDirect: number | null = 0

  direction!: FormGroup
  Pole!: FormGroup
  select!: FormGroup

  constructor(
    private fb: FormBuilder,
    private dirService: DirectionService,
    private poleService: PoleService,

  )
  {
    this.direction=this.fb.group({
      libelle: this.fb.control(""),
    });

    this.Pole=this.fb.group({
      libelle: this.fb.control("Pole 1"),
      direction_id: this.fb.control(0),
    });

    this.select=this.fb.group({
      direction_id: this.fb.control("0"),
    });

    this.select.get('direction_id')?.valueChanges.subscribe(res=>{
      // console.log(res);
      this.selectedDirect = res
    })
  }

  ngOnInit()
  {
    this.getDirections()
    this.getPoles()
  }

  getDirections()
  {
    this.dirService.listResources().subscribe(r => {
      this.directions = signal(r)
      // console.log(this.directions);
    })
  }

  addOrUpDirection()
  {
    if (this.btn == 'Ajouter') {
    // console.log(this.direction.value);
      this.dirService.addResources(this.direction.value).subscribe((d:any)=>{
        console.log(d);
        if (d.message) {
          this.getDirections()
          this.direction.reset()
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
      this.dirService.updateResources(this.idDir, this.direction.value).subscribe((d:any)=>{
        console.log(d);
        if (d.message) {
          this.getDirections()
          this.direction.reset()
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
    }
  }

  deleteDirec(id: number|null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.dirService.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getDirections()
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
        Swal.fire("La suppression a été annulée", "", "info");
      }
    });
  }

  getPoles()
  {
    this.poleService.listResources().subscribe(r => {
      this.poles = signal(r)
      console.log(r);
    })
  }

  addOrUpPole()
  {
    if (this.button == 'Ajouter') {
    // console.log(this.direction.value);
      this.poleService.addResources(this.Pole.value).subscribe((d:any)=>{
        console.log(d);
        if (d.message) {
          this.getPoles()
          this.Pole.reset()
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
    }else if(this.button == 'Modifier'){
      this.poleService.updateResources(this.idPole, this.Pole.value).subscribe((d:any)=>{
        console.log(d);
        if (d.message) {
          this.getPoles()
          this.Pole.reset()
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
    }
  }

  editDirec(direction: any)
  {
    this.btn = 'Modifier'
    this.direction.patchValue({
      libelle: direction.libelle
    })
    this.idDir = direction.id
  }

  openModal()
  {
    let modal = document.getElementById('pole');
    if (modal) {
      this.title = 'Nouveau pole'
      this.button = 'Ajouter'
      modal.style.display = 'block';
    }
  }

  editModal(pole: any)
  {
    let modal = document.getElementById('pole');
    if (modal) {
      this.idPole = pole.id
      this.title = 'Modification pole'
      this.button = 'Modifier'
      modal.style.display = 'block';
      this.Pole.patchValue({
        libelle: pole.libelle,
        direction_id: pole.direction_id
      })
    }
  }

  deletePole(id: number | null)
  {
    Swal.fire({
      title: "Voulez-vous confirmer la suppression ?",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: `Annuler`
    }).then((result) => {
      if (result.isConfirmed) {
        this.poleService.deleteResource(id).subscribe((d:any) => {
          if (d.message) {
            this.getPoles()
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
        Swal.fire("La suppression a été annulée", "", "info");
      }
    });
  }

  closeModal()
  {
    let modal = document.getElementById('pole');
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
