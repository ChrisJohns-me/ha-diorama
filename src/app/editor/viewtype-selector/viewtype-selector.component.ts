import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainModeEnum } from 'src/app/shared/enums/main-mode.enum';

@Component({
  selector: 'app-viewtype-selector',
  templateUrl: './viewtype-selector.component.html',
  styleUrls: ['./viewtype-selector.component.scss']
})
export class ViewTypeSelectorComponent {
  constructor(
    private router: Router,
  ) { }

  public modeClick(newMode: MainModeEnum = MainModeEnum.VIEW): void {
    if (newMode === MainModeEnum.VIEW) this.router.navigate([newMode]);
    if (newMode === MainModeEnum.EDIT) this.router.navigate([]);
  }
}
