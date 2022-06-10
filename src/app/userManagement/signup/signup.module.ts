import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { BackendService } from '../backend-service';
import { TokenizeService } from 'src/app/tokenize.service';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  }
];

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    CheckBoxModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BackendService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]

})
export class SignupModule { }
