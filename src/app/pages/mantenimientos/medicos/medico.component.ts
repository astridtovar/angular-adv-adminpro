import Swal from 'sweetalert2';
import {
  ActivatedRoute,
  ActivationEnd,
  Params,
  Router
  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from './../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm
      .get('hospital')
      .valueChanges.subscribe((hospitalId: string) => {
        this.hospitalSeleccionado = this.hospitales.find(
          (o) => o._id === hospitalId
        );
      });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService
      .getMedicoById(id)
      .pipe(delay(100))
      .subscribe((medico) => {
        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
        this.medicoSeleccionado = medico;
        const {
          nombre,
          hospital: { _id },
        } = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.actualizarMedico(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.response._id}`);
        });
    }
  }
}
