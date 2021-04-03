import Swal from 'sweetalert2';
import { BusquedasService } from './../../../services/busquedas.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  private hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarHospitales();
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.hospitales = this.hospitalesTemp);
    }

    this.busquedasService
      .buscar('hospitales', termino)
      .subscribe((resultados: any) => {
        this.hospitales = resultados;
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((resp) => {
      this.cargando = false;
      this.hospitales = resp;
    });
  }

  actualizarHospital(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });
  }

  async abrirSweeAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.response);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }
}
