import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public user: any [];
  public userNotFound = false;
  public loading = false;

  constructor(private beService: BackendService, private router?: Router) {
    this.formgroup = new FormGroup
    ({
      email : new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {}

    get getemail(): FormControl {
      return this.formgroup.get('email') as FormControl;
    }

    checkEmail() {
      if (this.getemail.errors) {
        this.formSubmitted = true;
        return;
      } else {
      this.loading = true;
      this.beService.checkEmail({ email: this.formgroup.controls.email.value }).subscribe((response: any) => {
        if (response.status) {
          this.loading = false;
          localStorage.setItem('actorId', response.message[0].id);
          localStorage.setItem('actorEmail', response.message[0].email);
          this.router.navigateByUrl('/verification');

        } else {
          this.userNotFound = true;
          this.loading = false;
      }
      });
    }
  }

}
