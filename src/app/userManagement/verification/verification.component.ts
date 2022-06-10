import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public invalidCode = false;

  constructor(private beService: BackendService, private router?: Router) {
    this.formgroup = new FormGroup
    ({
      code : new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  get getcode(): FormControl {
    return this.formgroup.get('code') as FormControl;
  }

  checkCode() {
    if (this.getcode.errors) {
      this.formSubmitted = true;
      return;
    } else {
    this.beService.checkCode({email: localStorage.getItem('actorEmail'), code: this.formgroup.controls.code.value})
    .subscribe((response: any) => {
      if (response.status) {
        localStorage.setItem('passwordResetKey', response.key);
        this.router.navigateByUrl('Changepassword');
        this.invalidCode = false;
        
      } else {
        this.invalidCode = true;
      }
    });
  }
  }
  
}
