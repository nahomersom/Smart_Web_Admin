import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend-service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/Services/admin.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    public formgroup: FormGroup;
    public formSubmitted = false;
    public invalidClass = false;
    public actor: any;
    public passwordMatchFail = false;

    constructor(private beService?: BackendService, private router?: Router, private adminService?: AdminService) {
      this.formgroup = new FormGroup
      ({
        fullName : new FormControl('', [Validators.required]),
        email : new FormControl(''),
        oldpassword : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
        password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
        repassword : new FormControl('', Validators.required)
      });
    }

    get getfullname(): FormControl {
      return this.formgroup.get('fullName') as FormControl;
    }
    get getemail(): FormControl {
      return this.formgroup.get('email') as FormControl;
    }
    get getoldpassword(): FormControl {
      return this.formgroup.get('oldpassword') as FormControl;
    }
    get getpassword(): FormControl {
      return this.formgroup.get('password') as FormControl;
    }
    get getrepassword(): FormControl {
      return this.formgroup.get('repassword') as FormControl;
    }

    ngOnInit() {
      this.beService.getactor(localStorage.getItem('actorId'))
      .subscribe((data: any) => {
        this.actor = data;
        this.getfullname.setValue(this.actor.fullName);
        this.getemail.setValue(this.actor.email);
        this.getemail.disable();
      });
    }

    updateProfile(): any {
      if (this.getfullname.errors || this.getpassword.errors || this.getrepassword.errors || this.getoldpassword.errors
        || this.getoldpassword.errors) {
            this.formSubmitted = true;
            this.invalidClass = true;
            return;
      } else {
        if (this.getpassword.value !== this.getrepassword.value) {
          this.passwordMatchFail = true;
          return;
        } else {
          this.invalidClass = false;
          return this.adminService.updateprofile(
            {
              id: localStorage.getItem('actorId'),
              fullName : this.formgroup.controls.fullName.value,
              email : this.formgroup.controls.email.value,
              password : this.formgroup.controls.password.value,
              oldpassword : this.formgroup.controls.oldpassword.value,
            }).subscribe((response: any) => {
              if (response.status === 3) {
                window.alert('Old Password is Not Correct');
                } else {
                  if(response.status === 1){
                    window.alert('User Profile Successfully !');
                    this.router.navigate(['login']);
                  }
                }
            });
         }

      }
  }
}
