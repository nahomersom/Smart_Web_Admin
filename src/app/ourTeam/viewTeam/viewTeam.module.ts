import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewTeamComponent } from './view-team.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamService } from '../team.service';
import { TokenizeService } from 'src/app/tokenize.service';
const routes: Routes = [
  {
    path: '',
    component: ViewTeamComponent
  },
];
@NgModule({
  declarations: [ViewTeamComponent],
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
    TeamService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class ViewTeamModule { }
