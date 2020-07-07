import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { ScrollerModule } from '../../atoms/scroller/scroller.module';



@NgModule({
  declarations: [GridComponent],
  imports: [
	CommonModule,
	ScrollerModule
  ],
  exports:[
	  GridComponent
  ]
})
export class GridModule { }
