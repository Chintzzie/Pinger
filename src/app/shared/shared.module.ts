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
import { EventCompareComponent } from './event-compare/event-compare.component';
import { AutoCompleteModule } from '../components/Bhaskar/molecules/auto-complete/auto-complete.module';
import { UtilitiesModule } from '../components/Bhaskar/util/utilities.module';
import { GridModule } from '../components/Bhaskar/molecules/grid/grid.module';
import { KrishnaModule } from '../components/Krishna/krishna.module';
import { ScrollPanelModule } from '../components/Pavan/scrollpanel/scrollpanel.module';
import { TableModule } from '../components/Sushanth/table/table.module';
import { ButtonModule } from '../components/Sushanth/button/button.module';
import { IconModule } from '../components/Sushanth/icon/icon.module';
import { DividerModule } from '../components/Sushanth/divider/divider.module';



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
    AutoCompleteModule,
    GridModule,
    UtilitiesModule,
    KrishnaModule,
    ScrollPanelModule,
    TableModule,
    ButtonModule,
    IconModule,
    DividerModule
  ],
  exports:[LoginComponent]
})
export class SharedModule { }
