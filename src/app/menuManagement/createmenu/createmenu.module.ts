import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreatemenuComponent } from './createmenu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MenuService } from '../menu.service';
import { CataService } from 'src/app/categoryManagement/cata.service';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { TokenizeService } from 'src/app/tokenize.service';


const routes: Routes = [
  {
    path: '',
    component: CreatemenuComponent
  },
];
@NgModule({
  declarations: [CreatemenuComponent],
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
    MenuService,
    CataService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class CreateMenuModule { }
