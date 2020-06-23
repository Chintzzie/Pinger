import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteComponent } from './auto-complete.component';
import { FormsModule } from '@angular/forms';
import { VsfTemplateDirective } from '../util/vsf-template.directive';
import { SelectionListModule } from '../selection-list/selection-list.module';
import { UtilitiesModule } from '../util/utilities.module';
import { InputboxModule } from '../inputbox/inputbox.module';



@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    SelectionListModule,
    InputboxModule,
    UtilitiesModule
  ],
  exports:[
    AutoCompleteComponent,
    FormsModule
  ]
})
export class AutoCompleteModule { }
