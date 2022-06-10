import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { FileInfo } from '@syncfusion/ej2-angular-inputs';
import { TeamService } from '../team.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-team-member',
  templateUrl: './new-team-member.component.html',
  styleUrls: ['./new-team-member.component.css']
})
export class NewTeamMemberComponent implements OnInit {

  public form: FormGroup;

  public formSubmitted = false; 
  public invalidClass = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;
  public parentId: any;
  public photoUrl: any;

  public ddlelementDataLanguage: string[] = ['Amharic', 'Oromifa', 'Harari', 'Arabic'];
  public headerText: any = [
    { text: 'English (Default)' },
    { text: 'Local Language' }
  ];

  public input = new FormData();

  public IdsArray: any [] = [];
  public photoName: any = '';

  public dropElement: HTMLElement;
  public filesName: string[] = [];
  public filesDetails: FileInfo[] = [];
  public filesList: HTMLElement[] = [];
  public uploadWrapper: HTMLElement;
  public parentElement: HTMLElement;

  constructor(
    private teamService: TeamService,
    private fb?: FormBuilder,
    private router?: Router,
    private actRoute?: ActivatedRoute
  ) {
    this.form = this.fb.group({
      fullName: new FormControl('', Validators.required),
      profession: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      biography: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      facebook : new FormControl(''),
      twitter: new FormControl(''),
      linkedin: new FormControl(''),
      localLanguage: this.fb.array([])
    });
  }

  get getfullName(): FormControl {
    return this.form.get('fullName') as FormControl;
  }
  get getprofession(): FormControl {
    return this.form.get('profession') as FormControl;
  }
  get getemail(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get getphone(): FormControl {
    return this.form.get('phone') as FormControl;
  }
  get getbiography(): FormControl {
    return this.form.get('biography') as FormControl;
  }
  get getphoto(): FormControl {
    return this.form.get('photo') as FormControl;
  }
  get getfacebook(): FormControl {
    return this.form.get('facebook') as FormControl;
  }
  get gettwitter(): FormControl {
    return this.form.get('twitter') as FormControl;
  }
  get getlinkedin(): FormControl {
    return this.form.get('linkedin') as FormControl;
  }
  get getLocalfullName(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('LocalfullName') as FormControl;
  }
  get getLocalprofession(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('Localprofession') as FormControl;
  }
  get getLocalbiography(): FormControl {
    const con = this.CreateLocallanguage();
    return con.get('Localbiography') as FormControl;
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
      this.teamService.getteam(id).subscribe((data: any) => {
        this.parentId = data.id;
        this.getfullName.setValue(data.fullName);
        this.getprofession.setValue(data.profession);
        this.getemail.setValue(data.email);
        this.getphone.setValue(data.phone);
        this.photoUrl = data.photo;
        this.photoName = data.photoName;
        this.getbiography.setValue(data.Biography);
        this.getfacebook.setValue(data.facebook);
        this.gettwitter.setValue(data.twitter);
        this.getlinkedin.setValue(data.linkedin);

        if (data.other !== undefined && data.other.length > 0) {
        let loop = 0;
        data.other.forEach(element => {
          this.IdsArray [loop] = element.id;
          const LLA = this.CreateLocallanguage();

          LLA.controls.Locallanguage.setValue(element.language);
          LLA.controls.LocalfullName.setValue(element.fullName);
          LLA.controls.Localprofession.setValue(element.profession);
          LLA.controls.Localbiography.setValue(element.Biography);
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
             fullName : element.value.LocalfullName,
             profession : element.value.Localprofession,
             Biography : element.value.Localbiography,
             language : element.value.Locallanguage,
           };
          byLocalLanguage.push(newData);
         });

        const other = JSON.stringify(byLocalLanguage);
        this.input.append('other', other);
        this.input.append('language', 'English');
        this.input.append('parentId', '0');
        const formData = this.prepareSave();

        return this.teamService
          .createteam(formData)
          .subscribe((response: any) => {
            if(response.status){
              this.router.navigate(['dashboard/team/view']);
            }

          });
      } else {
        let loop = 0;
        byLocalLanguage = [];
        data.forEach(element => {
          const newData =  {
            id : this.IdsArray[loop],
            fullName : element.value.LocalfullName,
            profession : element.value.Localprofession,
            Biography : element.value.Localbiography,
            language : element.value.Locallanguage,
            parentId: this.parentId
          };
          byLocalLanguage.push(newData);
          loop ++;
        });
        const other = JSON.stringify(byLocalLanguage);
        this.input.append('id', this.currentEditingID);
        this.input.append('photoName', this.photoName);
        this.input.append('other', other);
        const formData = this.prepareSave();
        return this.teamService
          .updateteam(formData)
          .subscribe((response: any) => {
            if(response.status){
              this.currentEditingID = '';
              this.router.navigate(['dashboard/team/view']);
            }

            
          });
      }
     }
  }

  CreateLocallanguage(): FormGroup {
    return this.fb.group({
      LocalfullName: new FormControl('', Validators.required),
      Localprofession: new FormControl('', Validators.required),
      Localbiography: new FormControl('', Validators.required),
      Locallanguage: new FormControl('', Validators.required)
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
        return this.teamService.removeteam(databaseId).subscribe((response: any) => {
          if(response.status){
            this.IdsArray.splice(index, 1);
          }
        });
      } else {
        this.IdsArray.splice(index, 1);
      }
    }
  }

  onFileChangePhoto(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.form.get('photo').setValue(i[0].rawFile);
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

 private prepareSave(): any {
  this.input.append('fullName', this.form.controls.fullName.value);
  this.input.append('profession', this.form.controls.profession.value);
  this.input.append('email', this.form.controls.email.value);
  this.input.append('phone', this.form.controls.phone.value);
  this.input.append('Biography', this.form.controls.biography.value);
  this.input.append('photo', this.getphoto.value ? this.getphoto.value : this.photoUrl);
  this.input.append('photoName', this.photoName);
  this.input.append('facebook', this.form.controls.facebook.value);
  this.input.append('twitter', this.form.controls.twitter.value);
  this.input.append('linkedin', this.form.controls.linkedin.value);
  return this.input;
}

  validation() {
    if (this.hideCreateButton) {
      if ( this.getfullName.errors ||
        this.getprofession.errors ||
        this.getemail.errors ||
        this.getphone.errors ||
        this.getbiography.errors ||
        this.getphoto.errors) {
        return true;
      }
    } else {
      if ( this.getfullName.errors ||
        this.getprofession.errors ||
        this.getemail.errors ||
        this.getphone.errors ||
        this.getbiography.errors) {
        return true;
      }
    }
  }

}
