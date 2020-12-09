import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DonaComponent } from './dona/dona.component';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
  exports: [IncrementadorComponent, DonaComponent],
})
export class ComponentsModule {}
