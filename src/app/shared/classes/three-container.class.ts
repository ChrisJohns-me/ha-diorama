import * as THREE from 'three';

export class ThreeContainer {
  public renderer: THREE.Renderer = new THREE.WebGLRenderer();
  public scene: THREE.Scene = new THREE.Scene();
  public camera: THREE.Camera;
  public controls: any; // TODO: Need strongly typed.
  public raycaster: THREE.Raycaster;
  public get meshObjects(): THREE.Mesh[] { return this._meshObjects; }

  protected get isRenderLooping(): boolean { return this._isRenderLooping; }
  protected set isRenderLooping(val: boolean) {
    if (val && !this._isRenderLooping) this.doRenderLoop();
    this._isRenderLooping = val;
  }

  private _isRenderLooping: boolean;
  private _meshObjects: THREE.Mesh[] = [];

  constructor() {
    this.setScene();
    this.setupGenericLights();
  }

  public onWindowResize(event: Event): void {
    this.camera.updateMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public startRenderLoop(): void {
    this.isRenderLooping = true;
    this.doRenderLoop();
  }

  public setScene(): void {
    this.scene.background = new THREE.Color( 0xf0f0f0 );
  }

  public setupGenericLights(): void {
    const ambientLight = new THREE.AmbientLight( 0x606060 );
    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();

    this.scene.add(ambientLight, directionalLight );
  }

  public doRender(): void {
    if (!this.scene || !this.camera) return;
    this.renderer.render(this.scene, this.camera);
  }

  public addMesh(...meshes: THREE.Mesh[]): void {
    meshes.forEach(mesh => {
      this.scene.add(mesh);
      this._meshObjects.push(mesh);
    });

    this.doRender();
  }

  public removeMesh(...meshes: THREE.Mesh[]): void {
    meshes.forEach(mesh => {
      this.scene.remove(mesh);
      this._meshObjects = this._meshObjects.filter(o => o.id === mesh.id);
    });

    this.doRender();
  }

  private doRenderLoop(): void {
    if (!this.isRenderLooping) return;
    window.requestAnimationFrame(() => this.doRenderLoop());
    this.doRender();
  }
}
