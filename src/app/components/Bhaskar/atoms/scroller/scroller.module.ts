import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scroller } from './scroller.directive';



@NgModule({
  declarations: [Scroller],
  imports: [
    CommonModule
  ],
  exports:[Scroller]
})
export class ScrollerModule { }
