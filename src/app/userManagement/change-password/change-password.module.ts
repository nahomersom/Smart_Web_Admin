import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { BackendService } from '../backend-service';
import { PasswordResetTokenizeService } from 'src/app/passwordresetTokenize.service';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  }
];

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BackendService,
    { provide: HTTP_INTERCEPTORS, useClass: PasswordResetTokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class ChangePasswordModule { }
