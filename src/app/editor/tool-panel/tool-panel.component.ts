import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ThreeContainer } from 'src/app/shared/classes/three-container.class';
import * as THREE from 'three';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss']
})
export class ToolPanelComponent implements OnInit, OnDestroy {

  private HUDMeshes: {[key: string]: THREE.Mesh} = {
    addWall: undefined
  };
  private three: ThreeContainer;
  private mouseRay: THREE.Vector2 = new THREE.Vector2();

  constructor(
    private editorService: EditorService
  ) {
    this.three = this.editorService.threeContainer;
    this.setupInteractivityHelpers();
  }

  public ngOnInit(): void {
    this.three.raycaster = new THREE.Raycaster();
  }

  public ngOnDestroy(): void {
    const destroyingMeshes: THREE.Mesh[] = [];
    for (const key in this.HUDMeshes) {
      if (!this.HUDMeshes.hasOwnProperty(key)) return;
      destroyingMeshes.push(this.HUDMeshes[key]);
    }

    this.three.scene.remove(...destroyingMeshes);
  }

  @HostListener('document:mousemove', ['$event'])
  public testEvent(event: MouseEvent): void {
    event.preventDefault();
    this.mouseRay.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    this.three.raycaster.setFromCamera( this.mouseRay, this.three.camera );
    const intersects = this.three.raycaster.intersectObjects( this.three.meshObjects );
    if (intersects.length > 0 ) {
      const intersect = intersects[ 0 ];
      this.HUDMeshes.addWall.position.copy( intersect.point ).add( intersect.face.normal );
      this.HUDMeshes.addWall.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
    }
    this.three.doRender();
  }

  public setupInteractivityHelpers(): void {
    const rollOverGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
    const rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
    this.HUDMeshes.addWall = new THREE.Mesh( rollOverGeo, rollOverMaterial );

    this.three.scene.add( this.HUDMeshes.addWall );
  }

}
