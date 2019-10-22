import { IEditorTool } from 'src/app/shared/interfaces/editor-tool.interface';
import { DoubleSide, Geometry, Intersection, Material, Mesh, MeshBasicMaterial, PlaneGeometry, Raycaster, Vector3, Color } from 'three';
import { ThreeContainer } from './../three-container.class';
import { ThreeResourceTracker } from './../three-resource-tracker.class';

const DEFAULT_WALL_HEIGHT: number = 8;
const DEFAULT_WALL_COLOR: number | Color = 0xf4f1ea;

export class WallEditorTool implements IEditorTool {
  public toolName: string = 'Wall Editor';

  private mousePos: Vector3 = new Vector3();
  private newWallStartPos: Vector3;
  private potentialWallGeo: Geometry;
  private potentialWallMat: Material;
  private potentialWallMesh: Mesh;
  private resTracker: ThreeResourceTracker = new ThreeResourceTracker();
  private wallMeshes: Mesh[] = [];

  constructor(
    private three: ThreeContainer,
  ) { }

  public toolActivationEvent(): void {
    this.potentialWallGeo = new PlaneGeometry();
    this.potentialWallMat = this.resTracker.track(new MeshBasicMaterial({
      color: 0xff0000, side: DoubleSide, opacity: 0.5, transparent: true
    }));
    this.potentialWallMesh = this.resTracker.track(new Mesh(this.potentialWallGeo, this.potentialWallMat));
    this.potentialWallMesh.visible = false;

    this.three.scene.add(this.potentialWallMesh);
  }

  public toolDeactivationEvent(): void {
    this.resTracker.dispose();
    this.potentialWallMesh.remove();
  }

  public raycastEvent(raycaster: Raycaster, intersects: Intersection[]): void {
    const intersect = intersects[0];
    this.mousePos = intersect.point;

    if (this.newWallStartPos) { // New wall has been started.
      this.potentialWallGeo.vertices[2].copy(intersect.point);
      this.potentialWallGeo.vertices[3].copy(intersect.point).add(new Vector3(0, DEFAULT_WALL_HEIGHT, 0));
      this.potentialWallGeo.verticesNeedUpdate = true;
    }
  }

  public raycastEndEvent(): void { }

  public mouseDownEvent(event: MouseEvent): void {
    if (event.button !== 0) return;
    if (this.newWallStartPos) return;

    this.newWallStartPos = this.mousePos;
    this.potentialWallGeo.vertices[0].copy(this.mousePos);
    this.potentialWallGeo.vertices[1].copy(this.mousePos).add(new Vector3(0, DEFAULT_WALL_HEIGHT, 0));
    this.potentialWallGeo.verticesNeedUpdate = true;
    this.potentialWallMesh.visible = true;
  }

  public mouseUpEvent(event: MouseEvent): void {
    if (event.button !== 0) return;
    if (!this.newWallStartPos) return;

    this.potentialWallMesh.visible = false;

    const startPos = this.newWallStartPos;
    const endPos = this.mousePos;
    this.createWall(startPos, endPos);
  }

  private createWall(startPos: Vector3, endPos: Vector3, height: number = DEFAULT_WALL_HEIGHT,
                     color: number | Color = DEFAULT_WALL_COLOR): void {
    this.potentialWallMesh.setRotationFromAxisAngle(new Vector3(0, 0, 0), 0);
    this.newWallStartPos = undefined;

    const newWallMat: Material = new MeshBasicMaterial({ color, side: DoubleSide });
    const newWallGeo: Geometry = new PlaneGeometry();
    const newWallMesh: Mesh = this.resTracker.track(new Mesh(newWallGeo, newWallMat));
    newWallGeo.vertices[0].copy(startPos);
    newWallGeo.vertices[1].copy(startPos.add(new Vector3(0, height, 0)));
    newWallGeo.vertices[2].copy(endPos);
    newWallGeo.vertices[3].copy(endPos.add(new Vector3(0, height, 0)));
    newWallGeo.verticesNeedUpdate = true;

    this.wallMeshes.push(newWallMesh);
    this.three.scene.add(newWallMesh);
  }
}
