import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend-service';
import { AdminService } from 'src/app/Admin/Services/admin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public emailAlreadyUsed = false;
  public passwordMatchFail = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;

  constructor(private beService?: BackendService, private actorService?: AdminService, private router?: Router, private actRoute?: ActivatedRoute) {
    this.formgroup = new FormGroup
    ({
      fullName : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      repassword : new FormControl('', Validators.required),
      status : new FormControl(true)
    });
  }

  ngOnInit() {
    const id = this.actRoute.snapshot.params.id;
    if (id !== undefined) {
      this.beService.getactor(id).subscribe((data: any) => {
        this.getfullname.setValue(data.fullName);
        this.getemail.setValue(data.email);
        this.getstatus.setValue(data.status === 'Enabled' ? true : false);
        this.getfullname.disable();
        this.getemail.disable();
        this.getpassword.disable();
        this.getrepassword.disable();
        this.hideCreateButton = false;
        this.hideSaveChangesButton = true;
        this.currentEditingID = data.id;
      });
    }
  }

  get getfullname(): FormControl {
    return this.formgroup.get('fullName') as FormControl;
  }
  get getemail(): FormControl {
    return this.formgroup.get('email') as FormControl;
  }
  get getpassword(): FormControl {
    return this.formgroup.get('password') as FormControl;
  }
  get getrepassword(): FormControl {
    return this.formgroup.get('repassword') as FormControl;
  }
  get getstatus(): FormControl {
    return this.formgroup.get('status') as FormControl;
  }

  onSubmit(): any {
    if (this.getfullname.errors || this.getemail.errors || this.getpassword.errors || this.getrepassword.errors) {
          this.formSubmitted = true;
          this.invalidClass = true;
          return;
    } else {
      if (this.getpassword.value !== this.getrepassword.value) {
        this.passwordMatchFail = true;
      } else {
          this.invalidClass = false;
          if (this.hideCreateButton) {
           // create
           return this.beService.actorSignup(
            {
              fullName : this.formgroup.controls.fullName.value,
              email : this.formgroup.controls.email.value,
              password : this.formgroup.controls.password.value,
              status : this.formgroup.controls.status.value ? 'Enabled' : 'Disabled'
            })
              .subscribe((response: any) => {
                if (response.status) {
                  window.alert('Actor Created Successfully !');
                  this.router.navigate(['dashboard/listUser']);
                  
                } else {
                  alert(response.message);
                 
                }

              });

          } else {
            return this.beService.updateActorprofile(
              {
               id : this.currentEditingID,
               fullName : this.formgroup.controls.fullName.value,
               email : this.formgroup.controls.email.value,
               status : this.formgroup.controls.status.value ? 'Enabled' : 'Disabled'
             })
              .subscribe((response: any) => {
                if(response.status){
                  this.currentEditingID = '';
                  alert('saved !');
                  this.router.navigate(['dashboard/listUser']);
                } else {
                  alert(response.message);

                }
                
              });
          }

      }
    }

  }

}
