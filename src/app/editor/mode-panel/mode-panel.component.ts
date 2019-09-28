import { Component } from '@angular/core';
import { ThreeContainer } from 'src/app/shared/classes/three-container.class';
import { EditorModeEnum } from 'src/app/shared/enums/editor-mode.enum';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-mode-panel',
  templateUrl: './mode-panel.component.html',
  styleUrls: ['./mode-panel.component.scss']
})
export class ModePanelComponent {

  private three: ThreeContainer;

  constructor(
    public editorService: EditorService
  ) {
    this.three = this.editorService.threeContainer;
  }

  public modeClick(newMode: EditorModeEnum = EditorModeEnum.SELECT): void {
    this.enableOrbitControls(newMode === EditorModeEnum.ORBIT);

    this.editorService.editorMode$.next(newMode);
  }

  private enableOrbitControls(doEnable: boolean): void {
    this.three.controls.enabled = doEnable;
  }
}
