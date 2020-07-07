import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { GridModule } from '../../molecules/grid/grid.module';
import { ButtonGroupModule } from '../../molecules/button-group/button-group.module';
import { UtilitiesModule } from '../../util/utilities.module';
import { AutoCompleteModule } from '../../molecules/auto-complete/auto-complete.module';
import { ButtonModule } from 'src/app/components/Sushanth/button/button.module';



@NgModule({
  declarations: [ContainerComponent],
  imports: [
	  ButtonModule,
	AutoCompleteModule,
	UtilitiesModule,
	ButtonGroupModule,
	GridModule,
	CommonModule
  ],
  exports:[ContainerComponent]
})
export class ContainerModule { }
