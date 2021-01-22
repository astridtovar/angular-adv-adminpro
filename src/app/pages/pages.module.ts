import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { Grafica1Component } from './grafica1/grafica1.component';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
