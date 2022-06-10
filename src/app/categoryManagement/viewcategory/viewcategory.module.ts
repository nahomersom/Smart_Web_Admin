import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewcategoryComponent } from './viewcategory.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CataService } from '../cata.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TokenizeService } from 'src/app/tokenize.service';
const routes: Routes = [
  {
    path: '',
    component: ViewcategoryComponent
  },
];
@NgModule({
  declarations: [ViewcategoryComponent],
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
    CataService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class ViewcategoryModule { }
