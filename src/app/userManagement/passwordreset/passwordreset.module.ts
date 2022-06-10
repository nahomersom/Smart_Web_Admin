import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordresetComponent } from './passwordreset.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { BackendService } from '../backend-service';

const routes: Routes = [
  {
    path: '',
    component: PasswordresetComponent
  }
];

@NgModule({
  declarations: [PasswordresetComponent],
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
    BackendService
  ],
  exports: [RouterModule]
})
export class PasswordresetModule { }
