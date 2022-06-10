import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { TokenizeService } from '../../../../src/app/tokenize.service';
import { CreateComponent } from './create.component';
import { EventsService } from '../../../app/eventsManagement/service/events.service';
import { DateTimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';


const routes: Routes = [
  {
    path: '',
    component: CreateComponent
  },
];

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    DropDownListModule,
    SwitchModule,
    CheckBoxModule,
    TabModule,
    DateTimePickerModule,
    DatePickerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    EventsService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class CreateModule { }
