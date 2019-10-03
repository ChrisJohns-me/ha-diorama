import { IEditorTool } from 'src/app/shared/interfaces/editor-tool.interface';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { ThreeContainer } from './../three-container.class';

const DEFAULT_WALL_HEIGHT: number = 10;

export class WallEditorTool implements IEditorTool {

  private newWallGUIHintGeo: THREE.BufferGeometry;
  private newWallGUIHintMat: THREE.Material;
  private newWallGUIHintMesh: THREE.Mesh;
  private newWallStartPos: THREE.Vector3;
  private mousePos: THREE.Vector3 = new Vector3();
  private isMouseDown: boolean = false;
  private wallMeshes: THREE.Mesh[] = [];
  private disposables: THREE.Object3D[] = [];


  constructor(private three: ThreeContainer) { }

  public toolActivationEvent(): void {
    this.newWallGUIHintGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    this.newWallGUIHintMat = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    this.newWallGUIHintMesh = new THREE.Mesh(this.newWallGUIHintGeo, this.newWallGUIHintMat);

    this.three.scene.add(this.newWallGUIHintMesh);
  }

  public toolDeactivationEvent(): void {
    this.newWallGUIHintMesh.remove();

  }

  public raycastEvent(raycaster: THREE.Raycaster, intersects: THREE.Intersection[]): void {
    const intersect = intersects[0];

    this.mousePos = intersect.point;

    if (!this.newWallStartPos) { // Wall not started.

    } else { // New wall has been started.
      this.guiHintMeshes.newWall.lookAt(this.mousePos);
    }

    if (!this.isMouseDown) {
      this.guiHintMeshes.newWall.position.copy(intersect.point).add(intersect.face.normal);
      this.guiHintMeshes.newWall.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    } else {
    }
  }

  public raycastEndEvent(): void { }

  public mouseDownEvent(event: MouseEvent): void {
    this.isMouseDown = true;

    if (!this.newWallStartPos) {
      this.newWallStartPos = this.mousePos;
      this.guiHintMeshes.newWall.position.copy(this.mousePos);
    }
  }

  public mouseUpEvent(event: MouseEvent): void {
    this.isMouseDown = false;

    if (this.newWallStartPos) {
      const startPos = this.newWallStartPos;
      const endPos = this.mousePos;
      this.createWall(startPos, endPos);
    }
  }

  private createWall(startPos: THREE.Vector3, endPos: THREE.Vector3, height?: number): void {
    this.newWallStartPos = undefined;
    // this.wallMeshes.push();
  }
}
