// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { NavBarComponent } from './toolbar.component';
import { NavLeftComponent } from './toolbar-left/toolbar-left.component';
import { NavRightComponent } from './toolbar-right/toolbar-right.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [NavBarComponent, NavLeftComponent, NavRightComponent],
  imports: [CommonModule, SharedModule, RouterLink],
  exports: [NavBarComponent]
})
export class NavBarModule {}
