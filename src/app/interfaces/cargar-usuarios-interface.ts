import { Usuario } from './../models/usuario.model';

export interface CargarUsuarioModel {
  total: number;
  usuarios: Usuario[];
}
