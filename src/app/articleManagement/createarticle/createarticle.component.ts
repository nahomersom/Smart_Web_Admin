import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../Services/article.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { CataService } from 'src/app/categoryManagement/cata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileInfo } from '@syncfusion/ej2-angular-inputs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {
  public Editor = ClassicEditor;
  public config = `placeholder:'Write your Body here.' `;

  public form: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;
  public parentId: any;
  public photoUrl: any = null;
  public ddlelementDataLanguage: string[] = ['Amharic', 'Oromifa', 'Harari'];
  public ddlelementDataCategory: any[] = [];
  public ddlelementDataMenu: any[] = [];
  public fields: object = { text: 'title', value: 'id' };
  public headerText: any = [ { text: 'English (Default)' }, { text: 'Local Language' }
  ];

  public input = new FormData();

  public tools: any = {
    enableFloating: true,
    items: [
      'Undo',
      'Redo',
      '|',
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      '|',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      '|',
      'SubScript',
      'SuperScript',
      '|',
      'LowerCase',
      'UpperCase',
      '|',
      'Formats',
      'Alignments',
      '|',
      'OrderedList',
      'UnorderedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'CreateLink',
      'Image',
      '|',
      'ClearFormat',
      'Print',
      'SourceCode',
      '|',
      'FullScreen',
      '|',
      'CreateTable'
    ]
  };

  public iframe: any = { enable: false };

  public IdsArray: any [] = [];
  public thumbnailName: any = '';
  public articleAuthor: any = '';

  public dropElement: HTMLElement;
  public filesName: string[] = [];
  public filesDetails: FileInfo[] = [];
  public filesList: HTMLElement[] = [];
  public uploadWrapper: HTMLElement;
  public parentElement: HTMLElement;

  constructor(
    public articleService: ArticleService,
    private cataService: CataService,
    private fb?: FormBuilder,
    private router?: Router,
    private actRoute?: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      featured: new FormControl(true),
      categoryId: new FormControl('', Validators.required),
      status: new FormControl(false),
      allowComment: new FormControl(false),
      membersOnly: new FormControl(false),
      thumbnail : new FormControl(null),
      subscribed: new FormControl(false),
      localLanguage: this.fb.array([])
    });
  }

  get gettitle(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get getbody(): FormControl {
    return this.form.get('body') as FormControl;
  }
  get getfeatured(): FormControl {
    return this.form.get('featured') as FormControl;
  }
  get getCategoryId(): FormControl {
    return this.form.get('categoryId') as FormControl;
  }
  get getstatus(): FormControl {
    return this.form.get('status') as FormControl;
  }
  get getallowComment(): FormControl {
    return this.form.get('allowComment') as FormControl;
  }
  get getmembersOnly(): FormControl {
    return this.form.get('membersOnly') as FormControl;
  }
  get getThumbnail(): FormControl {
    return this.form.get('thumbnail') as FormControl;
  }
  get getSubscribed(): FormControl {
    return this.form.get('subscribed') as FormControl;
  }
  get getLocaltitle(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('Localtitle') as FormControl;
  }
  get getLocalbody(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('Localbody') as FormControl;
  }
  get getLocallanguage(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('Locallanguage') as FormControl;
  }
  get getLocalSubscribed(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('LocalSubscribed') as FormControl;
  }
  get getlocalLanguage() {
    return this.form.get('localLanguage') as FormArray;
  }

  ngOnInit() {
    this.loadCategory();
    const id = this.actRoute.snapshot.params.id;
    if (id !== undefined) {
      this.articleService.getArticle(id).subscribe((data: any) => {
        this.parentId = data.id;
        this.getCategoryId.setValue(data.categoryId);
        this.gettitle.setValue(data.title);
        this.getbody.setValue(data.body);
        this.getfeatured.setValue(data.featured === 'True' ? true : false);
        this.getstatus.setValue(data.status === 'True' ? true : false);
        this.getallowComment.setValue(data.allowComment === 'True' ? true : false);
        this.getSubscribed.setValue(data.subscribed === 'True' ? true : false);
        if (data.subscribed === 'Sent') {
          this.getSubscribed.setValue(true);
          this.getSubscribed.disable();
        }
        this.getmembersOnly.setValue(data.membersOnly === 'True' ? true : false);
        this.photoUrl = data.thumbnail;
        this.thumbnailName = data.thumbnailName;
        this.articleAuthor = data.author;
        if (data.other !== undefined && data.other.length > 0) {
        let loop = 0;
        data.other.forEach(element => {
          this.IdsArray [loop] = element.id;
          const LLA = this.CreateLocallanguage();
          LLA.controls.Localtitle.setValue(element.title);
          LLA.controls.Localbody.setValue(element.body);
          LLA.controls.Locallanguage.setValue(element.language);
          LLA.controls.LocalSubscribed.setValue(element.subscribed === 'True' ? true : false);
          if (element.subscribed === 'Sent') {
            this.getLocalSubscribed.setValue(true);
            this.getLocalSubscribed.disable();
          }
          this.getlocalLanguage.push(LLA);
          loop ++;
        });
      }
        this.hideCreateButton = false;
        this.hideSaveChangesButton = true;
        this.currentEditingID = data.id;

        console.log(this.photoUrl)
      });
    }
  }

  onSubmit(): any {
    const data = this.getlocalLanguage.controls;
    let byLocalLanguage: any[] = [];
    if (
      this.gettitle.errors ||
      this.getbody.errors ||
      this.getCategoryId.errors
    ) {
      this.formSubmitted = true;
      this.invalidClass = true;
      return;
    } else {
      if (!this.checkFormArrayError()) {
        alert('Please fill all the required field in the local language form');
        return;
      }

      if (this.hideCreateButton) {
        data.forEach(element => {
          const newData =  {
             title : element.value.Localtitle,
             body : element.value.Localbody,
             language : element.value.Locallanguage,
             subscribed : element.value.LocalSubscribed,
           };
          byLocalLanguage.push(newData);
         });

        const other = JSON.stringify(byLocalLanguage);
        this.input.append('other', other);
        const formData = this.prepareSave();

        return this.articleService
          .createArticle(formData)
          .subscribe(() => {
            this.router.navigate(['dashboard/article/view']);
          });
      } else {
        let loop = 0;
        byLocalLanguage = [];
        data.forEach(element => {
          const newData =  {
            id : this.IdsArray[loop],
            title : element.value.Localtitle,
            body : element.value.Localbody,
            language : element.value.Locallanguage,
            subscribed : element.value.LocalSubscribed,
            parentId: this.parentId
          };
          byLocalLanguage.push(newData);
          loop ++;
        });
        const other = JSON.stringify(byLocalLanguage);
        this.input.append('id', this.currentEditingID);
        this.input.append('thumbnailName', this.thumbnailName);
        this.input.append('author', this.articleAuthor);
        this.input.append('other', other);
        const formData = this.prepareSave();
        return this.articleService
          .updateArticle(formData)
          .subscribe(() => {
            this.currentEditingID = '';
            this.router.navigate(['dashboard/article/view']);
          });
      }
    }
  }

  private prepareSave(): any {
    this.invalidClass = false;
    this.input.append('title', this.form.controls.title.value);
    this.input.append('body', this.form.controls.body.value);
    this.input.append('categoryId', this.form.controls.categoryId.value);
    this.input.append('language', 'English');
    this.input.append('author', localStorage.getItem('actorFullName'));
    this.input.append('parentId', '0');
    this.input.append('status', this.form.controls.status.value ? 'True' : 'False');
    this.input.append('allowComment', this.form.controls.allowComment.value ? 'True' : 'False');
    this.input.append('membersOnly', this.form.controls.membersOnly.value ? 'True' : 'False');
    this.input.append('featured', this.form.controls.featured.value ? 'True' : 'False');
    this.input.append('thumbnail', this.form.controls.thumbnail.value ? this.form.controls.thumbnail.value : this.photoUrl);
    this.input.append('thumbnailName', this.thumbnailName);
    this.input.append('subscribed', this.form.controls.subscribed.value ? 'True' : 'False');
    return this.input;
  }

  CreateLocallanguage(): FormGroup {
    return this.fb.group({
      Localtitle: new FormControl('', Validators.required),
      Localbody: new FormControl('', Validators.required),
      Locallanguage: new FormControl('', Validators.required),
      LocalSubscribed: new FormControl(false)
    });
  }

  addLocalLanguage() {
    const LLA = this.CreateLocallanguage();
    this.getlocalLanguage.push(LLA);
  }

  RemoveOtherLanguage(index: number, databaseId: any): any {
    const conf = confirm('Are you sure you want to delete');
    const data = this.getlocalLanguage;
    if (conf) {
      data.removeAt(index);
      if (databaseId !== undefined) {
        return this.articleService.removeArticle(databaseId).subscribe((response: any) => {
            if (response.status) {
              this.IdsArray.splice(index, 1);
            }
        });
      } else {
        this.IdsArray.splice(index, 1);
      }
    }
  }

  loadCategory() {
    this.cataService.getcategories('Article').subscribe((data: any[]) => {
      const incomingData = data;
      if (incomingData.length > 0) {
        this.ddlelementDataCategory = incomingData;
      }
    });
  }

  onFileChangeThumbnail(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.form.get('thumbnail').setValue(i[0].rawFile);
    }
  }

  getFormGroup(index): FormGroup {
    const formGroup = this.getlocalLanguage.controls[index] as FormGroup;
    return formGroup;
  }

  checkFormArrayError(): boolean {
      const FormArrayErrors: any[] = [];
      if (this.getlocalLanguage.length !== 0) {
        const FormArrayData = this.getlocalLanguage.controls;
        FormArrayData.forEach(element => {
          if (element.invalid) {
            FormArrayErrors.push(true);
          }
        });
        if (FormArrayErrors.length === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
  }

}
