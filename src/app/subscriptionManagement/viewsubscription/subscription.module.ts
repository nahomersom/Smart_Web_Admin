import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewsubscriptionComponent } from './viewsubscription.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubscriptionService } from '../services/subscription.service';
import { TokenizeService } from 'src/app/tokenize.service';


const routes: Routes = [
  {
    path: '',
    component: ViewsubscriptionComponent
  },
];
@NgModule({
  declarations: [ViewsubscriptionComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    DropDownListModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SubscriptionService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class SubscriptionModule { }
