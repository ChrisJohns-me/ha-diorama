import * as THREE from 'three';

export class Wall {
  constructor(
    private startPos: THREE.Vector3,
    private endPos: THREE.Vector3,
  ) { }
}
