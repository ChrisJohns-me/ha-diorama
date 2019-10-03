import * as THREE from 'three';

/** Inspired by Three.js Cleanup by threejsfundamentals
 * @see https://threejsfundamentals.org/threejs/lessons/threejs-cleanup.html
 */

type Resource = THREE.Material & THREE.Object3D & THREE.Texture;

export class ThreeResourceTracker {
  private resources: Set<Resource> = new Set();

  constructor() { }

  public track(resource: Resource | Resource[]): Resource | Resource[] {
    if (!resource) return resource;

    if (Array.isArray(resource)) {
      resource.forEach((resrc) => this.track(resrc));
      return resource;
    }

    if ((<any> resource).dispose || resource instanceof THREE.Object3D) this.resources.add(resource);
    if (resource instanceof THREE.Object3D) {
      if ((<any> resource).geometry) this.track((<any> resource).geometry);
      if ((<any> resource).material) this.track((<any> resource).material);
      if ((<any> resource).children) this.track((<any> resource).children);
    } else if (resource instanceof THREE.Material) {
      for (const value of Object.values(resource)) {
        if (value instanceof THREE.Texture) this.track(value);
      }
    }
  }

  public dispose(): void {
    this.resources.forEach((resrc) => {
      if (resrc instanceof THREE.Object3D && resrc.parent) resrc.parent.remove(resrc);
      if ((<any> resrc).dispose) (<any> resrc).dispose();
    });

    this.resources.clear();
  }
}
