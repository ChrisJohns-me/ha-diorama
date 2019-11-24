import { Injectable } from '@angular/core';
import { ThreeContainer } from '../shared/classes/three-container.class';

@Injectable()
export class EditorService {

  public threeContainer: ThreeContainer;

  constructor() { }
}
