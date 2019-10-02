import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { WallEditorTool } from 'src/app/shared/classes/editor-tools/wall-editor-tool.class';
import { ThreeContainer } from 'src/app/shared/classes/three-container.class';
import { IEditorTool } from 'src/app/shared/interfaces/editor-tool.interface';
import * as THREE from 'three';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss']
})
export class ToolPanelComponent implements OnInit, OnDestroy {
  public objectKeys: (o: object | {}) => string[] = Object.keys;

  public selectedTool: IEditorTool;
  public editorToolList: {[key: string]: IEditorTool};

  private three: ThreeContainer;
  private mouseRay: THREE.Vector2 = new THREE.Vector2();

  constructor(
    private editorService: EditorService
  ) {
    this.three = this.editorService.threeContainer;
    this.editorToolList = {
      wallEditor: new WallEditorTool(this.three),
    };
  }

  public ngOnInit(): void {
    this.three.raycaster = new THREE.Raycaster();
  }

  public ngOnDestroy(): void {
    for (const editorTool in this.editorToolList) {
      if (this.editorToolList.hasOwnProperty(editorTool)) {
        const tool = this.editorToolList[editorTool];
        if (tool.toolDeactivationEvent) tool.toolDeactivationEvent();
      }
    }
  }

  // #region Tool events
  public changeTool(toolKey: string): void {
    if (this.selectedTool === this.editorToolList[toolKey]) return; // Tool already selected.

    this.selectedTool = this.editorToolList[toolKey];
    if (this.selectedTool && this.selectedTool.toolActivationEvent) this.selectedTool.toolActivationEvent();
  }

  @HostListener('document:mousemove', ['$event'])
  public mouseMoveEvent(event: MouseEvent): void {
    event.preventDefault();
    this.mouseRay.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    this.three.raycaster.setFromCamera(this.mouseRay, this.three.camera);
    const intersects = this.three.raycaster.intersectObjects(this.three.meshObjects);
    if (intersects.length > 0) {
      if (this.selectedTool && this.selectedTool.raycastEvent) this.selectedTool.raycastEvent(this.three.raycaster, intersects);
    } else {
      if (this.selectedTool && this.selectedTool.raycastEndEvent) this.selectedTool.raycastEndEvent();
    }
    this.three.doRender();
  }

  @HostListener('document:click', ['$event'])
  public clickEvent(event: MouseEvent): void {
    event.preventDefault();
    if (this.selectedTool && this.selectedTool.clickEvent) this.selectedTool.clickEvent(event);
  }
  @HostListener('document:mouseup', ['$event'])
  public mouseUpEvent(event: MouseEvent): void {
    event.preventDefault();
    if (this.selectedTool && this.selectedTool.clickEvent) this.selectedTool.mouseUpEvent(event);
  }
  @HostListener('document:mousedown', ['$event'])
  public mouseDownEvent(event: MouseEvent): void {
    event.preventDefault();
    if (this.selectedTool && this.selectedTool.clickEvent) this.selectedTool.mouseDownEvent(event);
  }
  // #endregion
}
