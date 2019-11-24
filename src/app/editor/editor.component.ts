import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { ThreeContainer } from '../shared/classes/three-container.class';
import { EditorService } from './editor.service';

// TODO: More dynamically calculate the sidebar's width.
const SIDEBAR_WIDTH: number = 480;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, OnInit, OnDestroy {
  public get viewtype(): '2d' | '3d' { return this._viewtype; }
  public set viewtype(value: '2d' | '3d') {
    this._viewtype = value;
    if (value === '2d') this.set2dEditorCamera();
    else if (value === '3d') this.set3dEditorCamera();
  }

  @ViewChild('rendererContainer', { static: false }) private rendererContainer: ElementRef;
  private unsubscribe: Subject<void> = new Subject<void>();
  private three: ThreeContainer = new ThreeContainer();
  private _viewtype: '2d' | '3d' = '2d';

  constructor(
    private editorService: EditorService,
    private route: ActivatedRoute,
  ) {
    this.editorService.threeContainer = this.three;
    this.createEditorCamera();
    this.set2dEditorCamera(); // Default viewtype
    this.createGrid();
    this.createGeometry();
    this.setupOrbitControls();
    this.watchQueryParams();
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.rendererContainer.nativeElement.appendChild(this.three.renderer.domElement);
    this.calcCanvasSize();
    this.three.startRenderLoop();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getCanvasWidth(): number {
    return window.innerWidth - SIDEBAR_WIDTH;
  }

  private getCanvasHeight(): number {
    return window.innerHeight;
  }

  @HostListener('window:resize')
  private calcCanvasSize(): void {
    this.three.canvasResize(this.getCanvasWidth(), this.getCanvasHeight());
  }

  private createEditorCamera(): void {
    this.three.camera = new THREE.PerspectiveCamera(75, this.getCanvasWidth() / this.getCanvasHeight(), 1, 10000);
  }

  private set2dEditorCamera(): void {
    this.three.camera.position.set(0, 125, 0);
    this.three.camera.lookAt(0, 0, 0);
    // this.three.controls.enabled = false;
  }

  private set3dEditorCamera(): void {
    this.three.camera.position.set(50, 80, 125);
    this.three.camera.lookAt(0, 0, 0);
    // this.three.controls.enabled = true;
  }

  private createGrid(): void {
    const geometry = new THREE.PlaneBufferGeometry(100, 100);
    geometry.rotateX(- Math.PI / 2);
    const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
    const gridHelper = new THREE.GridHelper(100, 10);

    this.three.scene.add(gridHelper);
    this.three.addMesh(plane);
  }

  private createGeometry(): void {
  }

  private setupOrbitControls(): void {
    this.three.controls = new OrbitControls(this.three.camera, this.three.renderer.domElement);
    this.three.controls.enableDamping = true;
    this.three.controls.dampingFactor = 0.25;
    this.three.controls.enableZoom = false;
  }

  private watchQueryParams(): void {
    this.route.queryParams.pipe(
      filter((params) => params.viewtype && params.viewtype !== this.viewtype),
    ).subscribe((params) => {
      this.viewtype = params.viewtype;
    });
  }
}
