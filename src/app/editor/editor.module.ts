import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { EditorService } from './editor.service';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ModePanelComponent } from './mode-panel/mode-panel.component';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';

@NgModule({
  declarations: [
    EditorComponent,
    MenuBarComponent,
    ToolPanelComponent,
    ModePanelComponent
  ],
  imports: [
    SharedModule,
    EditorRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    EditorService
  ]
})
export class EditorModule { }
