import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { ThreeContainer } from '../shared/classes/three-container.class';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('rendererContainer', { static: false }) private rendererContainer: ElementRef;

  private unsubscribe: Subject<void> = new Subject<void>();
  private three: ThreeContainer = new ThreeContainer();

  constructor(
    public editorService: EditorService
  ) {
    this.editorService.threeContainer = this.three;
    this.createEditorCamera();
    this.createGrid();
    this.createGeometry();
    this.setupOrbitControls();
  }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.rendererContainer.nativeElement.appendChild(this.three.renderer.domElement);
    this.three.renderer.setSize(window.innerWidth, window.innerHeight);
    this.three.startRenderLoop();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event: Event): void {
    this.three.onWindowResize(event);
  }

  public createEditorCamera(): void {
    this.three.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.three.camera.position.set(50, 80, 125);
    this.three.camera.lookAt(0, 0, 0);
  }

  public createGrid(): void {
    const geometry = new THREE.PlaneBufferGeometry(100, 100);
    geometry.rotateX(- Math.PI / 2);
    const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { visible: false }));
    const gridHelper = new THREE.GridHelper(100, 10);

    this.three.scene.add(gridHelper);
    this.three.addMesh(plane);
  }

  public createGeometry(): void {
  }

  public setupOrbitControls(): void {
    this.three.controls = new OrbitControls(this.three.camera, this.three.renderer.domElement);
    this.three.controls.enableDamping = true;
    this.three.controls.dampingFactor = 0.25;
    this.three.controls.enableZoom = false;
  }

}
