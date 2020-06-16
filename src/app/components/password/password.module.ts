import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordDirective } from './password.directive';



@NgModule({
  declarations: [PasswordDirective],
  imports: [
    CommonModule
  ],
  exports: [PasswordDirective]
})
export class PasswordModule { }
