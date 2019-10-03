import * as THREE from 'three';

export interface IEditorTool {
  toolActivationEvent: () => void;
  toolDeactivationEvent: () => void;
  mouseDownEvent?: (event: MouseEvent) => void;
  mouseUpEvent?: (event: MouseEvent) => void;
  clickEvent?: (event: MouseEvent) => void;
  raycastEvent?: (raycaster: THREE.Raycaster, intersects: THREE.Intersection[]) => void;
  raycastEndEvent?: () => void;
}
