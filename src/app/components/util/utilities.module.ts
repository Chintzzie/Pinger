import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VsfTemplateDirective } from './vsf-template.directive';



@NgModule({
  declarations: [VsfTemplateDirective],
  imports: [
    CommonModule
  ]
  ,exports:[VsfTemplateDirective]
})
export class UtilitiesModule { }
