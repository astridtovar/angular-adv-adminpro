import Swal from 'sweetalert2';
import { BusquedasService } from './../../../services/busquedas.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from './../../../services/medico.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private medicosTemp: Medico[] = [];
  private imgSubs: Subscription;

  constructor(
    private medicosService: MedicoService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarMedicos();
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.medicos = this.medicosTemp);
    }

    this.busquedasService
      .buscar('medicos', termino)
      .subscribe((resultados: any) => {
        this.medicos = resultados;
      });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos().subscribe((resp) => {
      this.cargando = false;
      this.medicos = resp;
    });
  }

  // actualizarHospital(hospital: Hospital) {
  //   this.hospitalService
  //     .actualizarHospital(hospital._id, hospital.nombre)
  //     .subscribe((resp) => {
  //       Swal.fire('Actualizado', hospital.nombre, 'success');
  //     });
  // }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.eliminarMedico(medico._id).subscribe((resp) => {
          this.cargarMedicos();
          Swal.fire(
            'Médico borrado!',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }
}
