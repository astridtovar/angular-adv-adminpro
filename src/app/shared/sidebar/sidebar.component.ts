import { Component, OnInit } from '@angular/core';
import { SidebarService } from './../../services/sidebar.service';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public usuario: Usuario;

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {}
}
