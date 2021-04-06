import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from './../../services/busquedas.service';
import { Component, OnInit } from '@angular/core';
import { Hospital } from './../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      console.log(termino);
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino).subscribe((res: any) => {
      console.log(res);
      this.usuarios = res.response.usuarios;
      this.medicos = res.response.medicos;
      this.hospitales = res.response.hospitales;
    });
  }
}
