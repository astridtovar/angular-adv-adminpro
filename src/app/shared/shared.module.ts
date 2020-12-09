import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [BreadcrumbsComponent, SidebarComponent, HeaderComponent],
  exports: [BreadcrumbsComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule],
})
export class SharedModule {}
