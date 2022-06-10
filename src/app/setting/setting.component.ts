import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SettingService } from './setting.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  public form: FormGroup;

  public formSubmitted = false;
  public invalidClass = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;
  public input = new FormData();

  public headerText: any = [{ text: 'Address' }, { text: 'Social Media Links' }];


  constructor(private settingService: SettingService, private fb: FormBuilder, private actRoute?: ActivatedRoute, private router?: Router) {
    this.form = this.fb.group({
    pobox : [''],
    email : ['', [Validators.email, Validators.required]],
    phone : ['', Validators.required],
    fax : [''],
    street : ['', Validators.required],
    latitude : [''],
    longtiude : [''],
    facebook : [''],
    linkedin : [''],
    twitter : [''],
    });
  }

  ngOnInit() {
      this.settingService.getsettings()
      .subscribe((data: any[]) => {
        if(data.length > 0) {
          this.getpobox.setValue(data[0].pobox);
          this.getemail.setValue(data[0].email);
          this.getphone.setValue(data[0].phone);
          this.getfax.setValue(data[0].fax);
          this.getstreet.setValue(data[0].street);
          this.getlatitude.setValue(data[0].latitude);
          this.getlongtiude.setValue(data[0].longtiude);
          this.getfacebook.setValue(data[0].facebook);
          this.getlinkedin.setValue(data[0].linkedin);
          this.gettwitter.setValue(data[0].twitter);
          this.hideCreateButton = false;
          this.hideSaveChangesButton = true;
          this.currentEditingID = data[0].id;
        }
    });
  }

  get getpobox(): FormControl {
    return this.form.get('pobox') as FormControl;
  }
  get getemail(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get getphone(): FormControl {
    return this.form.get('phone') as FormControl;
  }
  get getfax(): FormControl {
    return this.form.get('fax') as FormControl;
  }
  get getstreet(): FormControl {
    return this.form.get('street') as FormControl;
  }
  get getlatitude(): FormControl {
    return this.form.get('latitude') as FormControl;
  }
  get getlongtiude(): FormControl {
    return this.form.get('longtiude') as FormControl;
  }
  get getfacebook(): FormControl {
    return this.form.get('facebook') as FormControl;
  }
  get getlinkedin(): FormControl {
    return this.form.get('linkedin') as FormControl;
  }
  get gettwitter(): FormControl {
    return this.form.get('twitter') as FormControl;
  }

  onSubmit(): any {
    if (this.getphone.errors || this.getemail.errors || this.getstreet.errors ) {
          this.formSubmitted = true;
          this.invalidClass = true;
          return;
    } else {
      this.invalidClass = false;

      this.input.append('pobox', this.form.controls.pobox.value);
      this.input.append('email', this.form.controls.email.value);
      this.input.append('phone', this.form.controls.phone.value);
      this.input.append('fax', this.form.controls.fax.value);
      this.input.append('street', this.form.controls.street.value);
      this.input.append('latitude', this.form.controls.latitude.value);
      this.input.append('longtiude', this.form.controls.longtiude.value);
      this.input.append('facebook', this.form.controls.facebook.value);
      this.input.append('linkedin', this.form.controls.linkedin.value);
      this.input.append('twitter', this.form.controls.twitter.value);


      if (this.hideCreateButton) {
      return this.settingService.createsetting(this.input)
          .subscribe((response:any) => {
            if(response.status){
              alert('Setting Saved Successfully');
              this.router.navigate(['dashboard/']);

            }
          });
    } else {
      this.input.append('id', this.currentEditingID);
      return this.settingService.updatesetting(this.input)
          .subscribe((response : any) => {
            if(response.status){
              this.currentEditingID = '';
              alert('Setting Saved Successfully');
              this.router.navigate(['dashboard/']);
            }
            
          });
    }
  }
 }

}
