import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { DocumentService } from '../document.service';
import { CataService } from 'src/app/categoryManagement/cata.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './createdocument.component.html',
  styleUrls: ['./createdocument.component.css']
})
export class CreateDocumentComponent implements OnInit {

  public form: FormGroup;

  public formSubmitted = false;
  public invalidClass = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;

  public ddlelementData: string[] = ['Amharic', 'Oromifa', 'Harari'];
  public ddlelementDataCategory: any[] = [];
  public headerText: any = [{ text: 'English (Default)' }, { text: 'Local Language' }];
  public IdsArray: any [] = [];
  public fields: object = { text: 'title', value: 'id' };
  public parentId: any;
  public input = new FormData();
  public documentName: any = '';
  public document: any = '';

  constructor(private documentService: DocumentService, private cataService: CataService, private fb: FormBuilder,
              private actRoute?: ActivatedRoute, private router?: Router,  ) {
    this.form = this.fb.group({
      title : ['', Validators.required],
      desc : [''],
      categoryId : ['', Validators.required],
      document : ['', Validators.required],
      status : [true],
      memberOnly : [],
      localLanguage: this.fb.array([])
    });
  }

  get gettitle(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get getdesc(): FormControl {
    return this.form.get('desc') as FormControl;
  }
  get getCategoryId(): FormControl {
    return this.form.get('categoryId') as FormControl;
  }
  get getstatus(): FormControl {
    return this.form.get('status') as FormControl;
  }
  get getmemberOnly(): FormControl {
    return this.form.get('memberOnly') as FormControl;
  }
  get getdocument(): FormControl {
    return this.form.get('document') as FormControl;
  }
  get getLocaltitle(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('Localtitle') as FormControl;
  }
  get getLocaldesc(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('Localdesc') as FormControl;
  }
  get getLocallanguage(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('Locallanguage') as FormControl;
  }
  get getlocalLanguage() {
    return this.form.get('localLanguage') as FormArray;
  }

  ngOnInit() {
    this.loadCategory();
    const id = this.actRoute.snapshot.params.id;
    if (id !== undefined) {
      this.documentService.getdocument(id)
      .subscribe((data: any) => {
      this.parentId = data.id;
      this.gettitle.setValue(data.title);
      this.getdesc.setValue(data.desc);
      this.getCategoryId.setValue(data.categoryId);
      this.document = data.document;
      this.documentName = data.documentName;
      this.getstatus.setValue(data.status === 'True' ? true : false);
      this.getmemberOnly.setValue(data.memberOnly === 'True' ? true : false);

      if (data.other !== undefined && data.other.length > 0) {
        let loop = 0;
        data.other.forEach(element => {
          this.IdsArray [loop] = element.id;
          const LLA =  this.CreateLocallanguage();
          LLA.controls.Localtitle.setValue(element.title);
          LLA.controls.Localdesc.setValue(element.desc);
          LLA.controls.Locallanguage.setValue(element.language);
          this.getlocalLanguage.push(LLA);
          loop ++;
        });
     }
      this.hideCreateButton = false;
      this.hideSaveChangesButton = true;
      this.currentEditingID = data.id;
       });
    }
  }

  onSubmit(): any {
    const data = this.getlocalLanguage.controls;
    let byLocalLanguage: any[] = [];

    if (this.validation()) {
          this.formSubmitted = true;
          this.invalidClass = true;
          return;
    } else {
      if (!this.checkFormArrayError()) {
        alert('Please fill all the required field in the local language form');
        return;
      }
      this.invalidClass = false;
      if (this.hideCreateButton) {
        data.forEach(element => {
          const newData =  {
             title : element.value.Localtitle,
             desc : element.value.Localdesc,
             language : element.value.Locallanguage,
           };
          byLocalLanguage.push(newData);
         });

        const other = JSON.stringify(byLocalLanguage);
        this.input.append('other', other);
        const formData = this.prepareSave();
        return this.documentService.createdocument(formData)
          .subscribe((response: any) => {
            if (response.status) {
              this.router.navigate(['dashboard/document/view']);
            } else {
              alert(response.message);
            }

          });
    } else {
      let loop = 0;
      byLocalLanguage = [];
      data.forEach(element => {
        const newData =  {
          id : this.IdsArray[loop],
          title : element.value.Localtitle,
          desc : element.value.Localdesc,
          language : element.value.Locallanguage,
          parentId: this.parentId
        };
        byLocalLanguage.push(newData);
        loop ++;
      });
      const other = JSON.stringify(byLocalLanguage);
      this.input.append('id', this.currentEditingID);
      this.input.append('documentName', this.documentName);
      this.input.append('document', this.document);
      this.input.append('other', other);
      const formData = this.prepareSave();

      return this.documentService.updatedocument(formData)
          .subscribe((response: any) => {
            if (response.status) {
              this.currentEditingID = '';
              this.router.navigate(['dashboard/document/view']);
            }

          });

    }
   }
  }

  private prepareSave(): any {
    this.input.append('title', this.form.controls.title.value);
    this.input.append('desc', this.form.controls.desc.value);
    this.input.append('categoryId', this.form.controls.categoryId.value);
    this.input.append('document', this.getdocument.value ? this.getdocument.value : this.document);
    this.input.append('documentName', this.documentName);
    this.input.append('language', 'English');
    this.input.append('parentId', '0');
    this.input.append('status', this.form.controls.status.value ? 'True' : 'False');
    this.input.append('memberOnly', this.form.controls.memberOnly.value ? 'True' : 'False');
    return this.input;
  }

  CreateLocallanguage(): FormGroup {
    return this.fb.group({
      Localtitle : new FormControl('', Validators.required),
      Localdesc : new FormControl('', Validators.required),
      Locallanguage : new FormControl('', Validators.required),
    });
  }

  addLocalLanguage() {
    const LLA =  this.CreateLocallanguage();
    this.getlocalLanguage.push(LLA);
  }

  RemoveOtherLanguage(index: number, databaseId: any): any {
    const conf = confirm('Are you sure you want to delete');
    const data = this.getlocalLanguage;
    if (conf) {
      data.removeAt(index);
      if (databaseId !== undefined) {
        return this.documentService.removedocument(databaseId).subscribe((response: any) => {
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
    this.cataService.getcategories('Document')
    .subscribe((data: any[]) => {
      const incomingData = data;
      if (incomingData.length > 0) {
        this.ddlelementDataCategory = incomingData;
      }
    });
  }

  onFileChangeDocument(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.form.get('document').setValue(i[0].rawFile);
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

  validation() {
    if (this.hideCreateButton) {
      if (this.gettitle.errors || this.getCategoryId.errors || this.getdocument.errors) {
        return true;
      }
    } else {
      if (this.gettitle.errors || this.getCategoryId.errors) {
        return true;
      }
    }
  }

}
