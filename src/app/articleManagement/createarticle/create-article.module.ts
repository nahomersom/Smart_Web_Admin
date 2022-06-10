import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { RouterModule, Routes } from '@angular/router';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { CreatearticleComponent } from './createarticle.component';
import { ArticleService } from '../Services/article.service';
import { CataService } from 'src/app/categoryManagement/cata.service';
import { RichTextEditorModule, MarkdownEditorService, TableService, CountService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { UploaderModule  } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { TokenizeService } from 'src/app/tokenize.service';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


const routes: Routes = [
  {
    path: '',
    component: CreatearticleComponent
  },
];
@NgModule({
  declarations: [CreatearticleComponent],
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
    CKEditorModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ArticleService, CataService, ToolbarService, LinkService, ImageService, HtmlEditorService, MarkdownEditorService,
    TableService, CountService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenizeService, multi: true },

  ],
  exports: [RouterModule]
})
export class CreateArticleModule { }
