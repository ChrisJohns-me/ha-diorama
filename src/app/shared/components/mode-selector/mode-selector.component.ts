import { Component } from '@angular/core';
import { MainModeEnum } from 'src/app/shared/enums/main-mode.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.scss']
})
export class ModeSelectorComponent {
  constructor(
    private router: Router,
  ) { }

  public modeClick(newMode: MainModeEnum = MainModeEnum.VIEW): void {
    if (newMode === MainModeEnum.VIEW) this.router.navigate([newMode]);
    if (newMode === MainModeEnum.EDIT) this.router.navigate([]);
  }
}
