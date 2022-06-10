import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { LinkService } from '../service/link.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createlink',
  templateUrl: './createlink.component.html',
  styleUrls: ['./createlink.component.css']
})
export class CreatelinkComponent implements OnInit {
  public form: FormGroup;

  public formSubmitted = false;
  public invalidClass = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;

  public ddlelementData: string[] = ['Amharic', 'Oromifa', 'Harari'];

  public headerText: any = [{ text: 'English (Default)' }, { text: 'Local Language' }];
  IdsArray: any [] = [];
  public parentId: any;
  public input = new FormData();


  constructor(private beService: LinkService, private fb: FormBuilder, private router?: Router, private actRoute?: ActivatedRoute) {
    this.form = this.fb.group({
    title : ['', Validators.required],
    desc : [''],
    address : ['', Validators.required],
    status : [false],
    localLanguage: this.fb.array([])
    });
}

  get gettitle(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get getaddress(): FormControl {
    return this.form.get('address') as FormControl;
  }
  get getdesc(): FormControl {
    return this.form.get('desc') as FormControl;
  }
  get getstatus(): FormControl {
    return this.form.get('status') as FormControl;
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
    const id = this.actRoute.snapshot.params.id;
    if (id !== undefined) {
      this.beService.getlink(id)
      .subscribe((data: any) => {
        this.parentId = data.id;
        this.gettitle.setValue(data.title);
        this.getdesc.setValue(data.desc);
        this.getaddress.setValue(data.address);
        this.getstatus.setValue(data.status === 'True' ? true : false);

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

    if (this.gettitle.errors || this.getaddress.errors ) {
        this.formSubmitted = true;
        this.invalidClass = true;
        return;
      } else {
        if (!this.checkFormArrayError()) {
          alert('Please fill all the required field in the local language form');
          return;
        }
        data.forEach(element => {
            const newData =  {
               title : element.value.Localtitle,
               desc : element.value.Localdesc,
               language : element.value.Locallanguage,
               address : this.form.controls.address.value
             };
            byLocalLanguage.push(newData);
           });

        const other = JSON.stringify(byLocalLanguage);
        this.input.append('title', this.form.controls.title.value);
        this.input.append('desc', this.form.controls.desc.value);
        this.input.append('address', this.form.controls.address.value);
        this.input.append('language', 'English');
        this.input.append('parentId', '0');
        this.input.append('status', this.form.controls.status.value ? 'True' : 'False');
        this.input.append('other', other);

        if (this.hideCreateButton) {
            return this.beService.createlink(this.input)
                .subscribe((response: any) => {
                  if(response.status){
                    this.router.navigate(['dashboard/link/view']);
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
                parentId: this.parentId,
                address : this.form.controls.address.value

              };
              byLocalLanguage.push(newData);
              loop ++;
            });

            const other = JSON.stringify(byLocalLanguage);
            this.input.append('id', this.currentEditingID);
            this.input.append('other', other);
            return this.beService.updatelink(this.input)
                .subscribe((response: any) => {
                  if(response.status){
                    this.currentEditingID = '';
                    this.router.navigate(['dashboard/link/view']);
                  }
                  
                });
          }
    }

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
        return this.beService.removelink(databaseId).subscribe((response: any) => {
          if(response.status){
            this.IdsArray.splice(index, 1);
          }
      });
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


