import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreatemediaComponent } from './createmedia.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MediaService } from '../services/media.service';
import { TokenizeService } from 'src/app/tokenize.service';
import { CataService } from 'src/app/categoryManagement/cata.service';


const routes: Routes = [
  {
    path: '',
    component: CreatemediaComponent
  },
];
@NgModule({
  declarations: [CreatemediaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    DropDownListModule,
    UploaderModule,
    CheckBoxModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MediaService,
    CataService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class CreateMediaModule { }
