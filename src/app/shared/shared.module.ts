import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { RatingStarComponent } from './rating-star/rating-star.component';
import {JQ_TOKEN } from './services/jquery.service';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { SearchFormComponent } from './search-form/search-form.component';
import { EventCardComponent } from './event-card/event-card.component';
import { PasswordModule } from '../components/password/password.module';
import { DragDropModule } from '../components/drag-drop/drag-drop';
import { EventCompareComponent } from './event-compare/event-compare.component';
import { ChipsModule } from '../components/chips/chips.module';
import { TableModule } from '../components/table/table.module';
import { AutoCompleteModule } from '../components/auto-complete/auto-complete.module';
import { SelectionListModule } from '../components/selection-list/selection-list.module';
import { UtilitiesModule } from '../components/util/utilities.module';



@NgModule({
  declarations: [
    EventListComponent,
    EventDetailComponent,
    RatingStarComponent,
    LoginComponent,
    RegisterComponent,
    SearchFormComponent,
    EventCardComponent,
    EventCompareComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PasswordModule,
    DragDropModule,
    ChipsModule,
    TableModule,
    AutoCompleteModule,
    SelectionListModule,
    UtilitiesModule
  ],
  exports:[LoginComponent]
})
export class SharedModule { }
