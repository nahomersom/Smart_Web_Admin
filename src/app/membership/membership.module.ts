import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MembershipComponent } from './membership.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { SharedModule } from '../shared/shared.module';
import { MembershipService } from './membership.service';
import { TokenizeService } from '../tokenize.service';

const routes: Routes = [
  {
    path: '',
    component: MembershipComponent
  },
];
@NgModule({
  declarations: [MembershipComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    SwitchModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MembershipService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class MembershipModule { }
