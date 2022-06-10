import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SettingService } from './setting.service';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { TokenizeService } from '../tokenize.service';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent
  },
];
@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    TabModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SettingService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class SettingModule { }
