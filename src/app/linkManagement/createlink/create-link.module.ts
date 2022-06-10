import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreatelinkComponent } from './createlink.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { LinkService } from '../service/link.service';
import { TokenizeService } from 'src/app/tokenize.service';


const routes: Routes = [
  {
    path: '',
    component: CreatelinkComponent
  },
];
@NgModule({
  declarations: [CreatelinkComponent],
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
    RouterModule.forChild(routes)
  ],
  providers: [
    LinkService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class CreateLinkModule { }
