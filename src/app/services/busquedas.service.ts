import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from './../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        )
    );
  }

  busquedaGlobal(termino: string){
    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url, this.headers);
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.response);
          case 'hospitales':
            return resp.response;
          case 'medicos':
            return resp.response;
          default:
            return [];
            break;
        }
      })
    );
  }
}
