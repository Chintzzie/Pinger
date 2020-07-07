import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inputbox } from './inputbox';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [Inputbox],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    Inputbox,
    FormsModule
  ]
})
export class InputboxModule { }
