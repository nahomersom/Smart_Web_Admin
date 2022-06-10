import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MenuService } from '../menu.service';
import { ViewmenuComponent } from './viewmenu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TokenizeService } from 'src/app/tokenize.service';


const routes: Routes = [
  {
    path: '',
    component: ViewmenuComponent
  },
];
@NgModule({
  declarations: [ViewmenuComponent],
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
    RouterModule.forChild(routes)
  ],
  providers: [
    MenuService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class ViewmenuModule { }
