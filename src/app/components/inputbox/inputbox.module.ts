import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inputbox } from './inputbox';


@NgModule({
  declarations: [Inputbox],
  imports: [
    CommonModule
  ],
  exports:[
    Inputbox
  ]
})
export class InputboxModule { }
