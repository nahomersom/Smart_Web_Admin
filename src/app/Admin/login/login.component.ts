import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formgroup: FormGroup;
  formSubmitted = false;
  invalidClass = false;
  public userNotFound = false;

  constructor(private beService?: AdminService, private router?: Router) {
    this.formgroup = new FormGroup({
      email : new FormControl('', [Validators.email, Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    });
  }

  ngOnInit() {}

  get email(): FormControl {
    return this.formgroup.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.formgroup.get('password') as FormControl;
  }

  onSubmit(): any {
      if (this.email.errors || this.password.errors) {
            this.formSubmitted = true;
            this.invalidClass = true;
            return;
      } else {
        this.invalidClass = false;
        this.beService.loginAuth(
            {
              email: this.formgroup.controls.email.value,
              password: this.formgroup.controls.password.value
            })
          .subscribe((data: any[]) => {
            if (data.length > 0) {
              if (data[0].status === 'Enabled') {
                localStorage.setItem('actorId', data[0].id);
                localStorage.setItem('actorEmail', data[0].email);
                localStorage.setItem('actorFullName', data[0].fullName);
                localStorage.setItem('key', data[0].key);
                window.location.replace('/dashboard');
              } else {
                alert('account Disabled. please contact the administrator to fix this');
              }
            } else {
              this.invalidClass = true;
              this.userNotFound = true;
            }
          });
      }
  }


}
