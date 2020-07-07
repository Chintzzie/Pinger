import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckComponent } from './check-box/check.component';
import { ImageComponent } from './image/image.component';
import { RadioComponent } from './radio-button/radio.component';



@NgModule({
  declarations: [
    CheckComponent,
    ImageComponent,
    RadioComponent
  ],
  imports: [
    CommonModule
  ]
  ,exports:[
    CheckComponent,
    ImageComponent,
    RadioComponent
  ]
})
export class KrishnaModule { }
