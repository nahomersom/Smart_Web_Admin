import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { ViewlinkComponent } from './viewlink.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LinkService } from '../service/link.service';
import { TokenizeService } from 'src/app/tokenize.service';

const routes: Routes = [
  {
    path: '',
    component: ViewlinkComponent
  },
];

@NgModule({
  declarations: [ViewlinkComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    DropDownListModule,
    SwitchModule,
    SharedModule,
    TabModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    LinkService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class ViewlinkModule { }
