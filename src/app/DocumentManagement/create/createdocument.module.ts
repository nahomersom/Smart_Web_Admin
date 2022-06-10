import { CataService } from 'src/app/categoryManagement/cata.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateDocumentComponent } from './createdocument.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DocumentService } from '../document.service';
import { TokenizeService } from 'src/app/tokenize.service';
const routes: Routes = [
  {
    path: '',
    component: CreateDocumentComponent
  },
];
@NgModule({
  declarations: [CreateDocumentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    DropDownListModule,
    TabModule,
    DialogModule,
    UploaderModule,
    CheckBoxModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DocumentService,
    CataService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class CreateDocumentModule { }
