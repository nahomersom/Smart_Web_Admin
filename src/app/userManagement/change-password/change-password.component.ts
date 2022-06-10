import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public passwordMatchFail = false;

  constructor(private beService?: BackendService, private router?: Router) {
    this.formgroup = new FormGroup
    ({
      password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      repassword : new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  }

  get getpassword(): FormControl {
    return this.formgroup.get('password') as FormControl;
  }

  get getrepassword(): FormControl {
    return this.formgroup.get('repassword') as FormControl;
  }

  onSubmit(): any {
    if (this.getpassword.errors || this.getrepassword.errors) {
        this.invalidClass = true;
        this.formSubmitted = true;
        return;
      } else {
        if (this.getpassword.value !== this.getrepassword.value) {
          this.passwordMatchFail = true;
          return;
        } else {
          return this.beService.setNewpassword(
            {
              id: localStorage.getItem('actorId'),
              password : this.formgroup.controls.password.value,
            })
              .subscribe((response: any) => {
                if(response.status){
                  window.alert('Password Changed Succssfully !');
                  localStorage.removeItem('passwordResetKey');
                  localStorage.removeItem('actorId');
                  localStorage.removeItem('actorEmail');
                  this.router.navigate(['login']);
                }
                
            });
        }
      }
  }

  confirmPassword(): any {
    if (this.getpassword.value !== this.getrepassword.value) {
      return false;
    } else {
      return true;
    }
  }

}
