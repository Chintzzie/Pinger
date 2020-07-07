import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonModule } from 'src/app/components/Sushanth/button/button.module';



@NgModule({
  declarations: [ButtonGroupComponent],
  imports: [
	CommonModule
  ],
  exports:[
	  ButtonGroupComponent
  ]
})
export class ButtonGroupModule { }
