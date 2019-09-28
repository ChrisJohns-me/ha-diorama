import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RenderOutputComponent } from './components/render-output/render-output.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RenderOutputComponent
  ],
  exports: [
    RenderOutputComponent,
    CommonModule,
  ]
})
export class SharedModule { }
