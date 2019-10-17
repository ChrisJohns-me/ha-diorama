import { ThreeResourceTracker } from './../three-resource-tracker.class';
import { IEditorTool } from 'src/app/shared/interfaces/editor-tool.interface';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { ThreeContainer } from './../three-container.class';

const DEFAULT_WALL_HEIGHT: number = 10;

export class WallEditorTool implements IEditorTool {

  public toolName: string = 'Wall Editor';

  private newWallGUIHintGeo: THREE.BufferGeometry;
  private newWallGUIHintMat: THREE.Material;
  private newWallGUIHintMesh: THREE.Mesh;
  private newWallStartPos: THREE.Vector3;
  private mousePos: THREE.Vector3 = new Vector3();
  private isMouseDown: boolean = false;
  private wallMeshes: THREE.Mesh[] = [];
  private disposables: THREE.Object3D[] = [];
  private resTracker: ThreeResourceTracker = new ThreeResourceTracker();

  constructor(
    private three: ThreeContainer,
  ) { }

  public toolActivationEvent(): void {
    this.newWallGUIHintGeo = this.resTracker.track(new THREE.BoxBufferGeometry(50, 50, 50));
    this.newWallGUIHintMat = this.resTracker.track(new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true }));
    this.newWallGUIHintMesh = this.resTracker.track(new THREE.Mesh(this.newWallGUIHintGeo, this.newWallGUIHintMat));

    this.three.scene.add(this.newWallGUIHintMesh);
  }

  public toolDeactivationEvent(): void {
    this.resTracker.dispose();
    this.newWallGUIHintMesh.remove();
  }

  public raycastEvent(raycaster: THREE.Raycaster, intersects: THREE.Intersection[]): void {
    const intersect = intersects[0];
    this.mousePos = intersect.point;

    if (!this.newWallStartPos) { // Wall not started.
      this.newWallGUIHintMesh.position.copy(intersect.point).add(intersect.face.normal);
      this.newWallGUIHintMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
      this.newWallGUIHintMesh.scale.set(1, 1, 1);
    } else { // New wall has been started.
      const dist: number = this.newWallStartPos.distanceTo(intersect.point);
      // this.newWallGUIHintMesh.scale.setZ(dist / 35);
      this.newWallGUIHintMesh.lookAt(this.mousePos);
    }
  }

  public raycastEndEvent(): void { }

  public mouseDownEvent(event: MouseEvent): void {
    if (event.button !== 0) return;
    this.isMouseDown = true;

    if (!this.newWallStartPos) {
      this.newWallStartPos = this.mousePos;
      this.newWallGUIHintMesh.position.copy(this.mousePos);
    }
  }

  public mouseUpEvent(event: MouseEvent): void {
    if (event.button !== 0) return;
    this.isMouseDown = false;

    if (this.newWallStartPos) {
      const startPos = this.newWallStartPos;
      const endPos = this.mousePos;
      this.createWall(startPos, endPos);
    }
  }

  private createWall(startPos: THREE.Vector3, endPos: THREE.Vector3, height?: number): void {
    this.newWallGUIHintMesh.setRotationFromAxisAngle(new Vector3(0, 0, 0), 0);
    this.newWallStartPos = undefined;
    // this.wallMeshes.push();
  }
}
