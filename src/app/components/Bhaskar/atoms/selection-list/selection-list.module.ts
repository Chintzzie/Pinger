import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionListComponent } from './selection-list.component';



@NgModule({
  declarations: [SelectionListComponent],
  imports: [
    CommonModule
  ],
  exports:[SelectionListComponent]
})
export class SelectionListModule { }
