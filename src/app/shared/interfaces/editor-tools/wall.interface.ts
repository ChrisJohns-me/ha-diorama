import * as THREE from 'three';

export interface IWall {
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  height?: number;
}
