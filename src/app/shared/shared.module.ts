import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModeSelectorComponent } from './components/mode-selector/mode-selector.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ModeSelectorComponent,
  ],
  exports: [
    CommonModule,
    ModeSelectorComponent,
  ]
})
export class SharedModule { }
