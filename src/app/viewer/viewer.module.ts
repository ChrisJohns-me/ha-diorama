import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';

@NgModule({
  declarations: [
    ViewerComponent,
  ],
  imports: [
    SharedModule,
    ViewerRoutingModule
  ]
})
export class ViewerModule { }
