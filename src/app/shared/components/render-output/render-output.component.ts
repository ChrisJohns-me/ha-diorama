import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-render-output',
  templateUrl: './render-output.component.html',
  styleUrls: ['./render-output.component.scss']
})
export class RenderOutputComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: false }) rendererContainer: ElementRef;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    // this.renderer.setSize(event.target.innerWidth, event.target.innerHeight)
  }
  private renderer = new THREE.WebGLRenderer();
  private scene = null;
  private camera = null;
  private mesh = null;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }

  public ngAfterViewInit(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  public animate(): void {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
