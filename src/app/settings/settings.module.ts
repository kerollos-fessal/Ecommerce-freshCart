import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { WebComponent } from './web/web.component';
import { MobileComponent } from './mobile/mobile.component';


@NgModule({
  declarations: [
    WebComponent,
    MobileComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
