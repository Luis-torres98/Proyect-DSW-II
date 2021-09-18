import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManuBarComponent } from './manu-bar/manu-bar.component';
import {MenubarModule} from 'primeng/menubar';

const LIST =[ ManuBarComponent ]

@NgModule({
  declarations: [LIST],
  imports: [
    CommonModule, 
	MenubarModule
  ],
  exports: [LIST]
})
export class SectionsModule { }
