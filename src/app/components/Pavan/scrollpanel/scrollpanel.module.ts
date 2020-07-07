import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollpanelComponent } from './scrollpanel.component';



@NgModule({
  declarations: [ScrollpanelComponent],
  imports: [
	CommonModule
  ],
  exports:[
	  ScrollpanelComponent
  ]
})
export class ScrollPanelModule { }
