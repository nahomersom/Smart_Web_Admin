import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../Services/article.service';
import { Routes, RouterModule } from '@angular/router';
import { ViewarticleComponent } from './viewarticle.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SharedModule } from 'src/app/shared/shared.module';
import { TokenizeService } from 'src/app/tokenize.service';

const routes: Routes = [
  {
    path: '',
    component: ViewarticleComponent
  },
];
@NgModule({
  declarations: [ViewarticleComponent],
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
    ArticleService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },

  ],
  exports: [RouterModule]
})
export class ViewArticleModule { }
