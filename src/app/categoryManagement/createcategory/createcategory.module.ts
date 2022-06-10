import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatecategoryComponent } from './createcategory.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { RouterModule, Routes } from '@angular/router';
import { CataService } from '../cata.service';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { TokenizeService } from 'src/app/tokenize.service';

const routes: Routes = [
  {
    path: '',
    component: CreatecategoryComponent
  },
];
@NgModule({
  declarations: [CreatecategoryComponent],
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
    CataService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class CreatecategoryModule { }
