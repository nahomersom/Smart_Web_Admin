import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { BackendService } from '../backend-service';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './verification.component';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { PasswordResetTokenizeService } from 'src/app/passwordresetTokenize.service';



const routes: Routes = [
  {
    path: '',
    component: VerificationComponent
  }
];

@NgModule({
  declarations: [VerificationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    MaskedTextBoxModule,
    RouterModule.forChild(routes)

  ],
  providers: [BackendService],
  exports: [RouterModule]
})
export class VerificationModule { }
