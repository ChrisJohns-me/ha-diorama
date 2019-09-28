import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EditorModeEnum } from '../shared/enums/editor-mode.enum';
import { ThreeContainer } from '../shared/classes/three-container.class';

@Injectable()
export class EditorService {

  public threeContainer: ThreeContainer;
  public editorMode$: BehaviorSubject<EditorModeEnum> = new BehaviorSubject<EditorModeEnum>(EditorModeEnum.SELECT);

  constructor() { }
}
