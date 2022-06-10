import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TeamService } from '../team.service';
import { NewTeamMemberComponent } from './new-team-member.component';
import { TokenizeService } from 'src/app/tokenize.service';

const routes: Routes = [
  {
    path: '',
    component: NewTeamMemberComponent
  },
];
@NgModule({
  declarations: [NewTeamMemberComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ButtonModule,
    DropDownListModule,
    SwitchModule,
    TabModule,
    RichTextEditorAllModule,
    DialogModule,
    UploaderModule,
    CheckBoxModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    TeamService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },
  ],
  exports: [RouterModule]
})
export class NewTeamModule { }
