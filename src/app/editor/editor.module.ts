import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';
import { ViewTypeSelectorComponent } from './viewtype-selector/viewtype-selector.component';

@NgModule({
  declarations: [
    EditorComponent,
    ToolPanelComponent,
    ViewTypeSelectorComponent,
  ],
  imports: [
    SharedModule,
    EditorRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [
    EditorService
  ]
})
export class EditorModule { }
