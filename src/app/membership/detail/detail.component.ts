import { Component, OnInit } from '@angular/core';
import { MembershipService } from '../membership.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public currentEditingID: any;
  public members: any;
  public activationStatus: any;
  public activated: any;
  public biobraphies: any[] = [];

  public headerText: any = [
    { text: 'Profile' },
    { text: 'Biographies' }
  ];

  constructor(public membershipService: MembershipService, private router?: Router, private actRoute?: ActivatedRoute) {
  }

  onSubmit(): any {
    return this.membershipService.activatemember({id: this.currentEditingID, status: this.activationStatus})
        .subscribe((response: any) => {
          if(response.status){
            this.currentEditingID = '';
            this.router.navigate(['dashboard/membership']);
          }
          
        });
  }

  ngOnInit() {
    const id = this.actRoute.snapshot.params.id;
    if (id !== undefined) {
      this.membershipService.getmember(id).subscribe((data: any) => {
        if(data){
          this.members = data;
          this.biobraphies = data.Biography;
          
          this.currentEditingID = data.id;
          this.activationStatus = data.status;
          this.activated = data.status === 'Activated' ? true : false;
        }
      });
    }
  }

  activate() {
    const conf = confirm('Are you sure you want to Activate this Member ?');
    if (conf) {
      this.activationStatus = 'Activated';
      this.activated = true;
      this.onSubmit();
    }
  }

  deactivate() {
    const conf = confirm('Are you sure you want to Deactivate this Member ?');
    if (conf) {
      this.activationStatus = 'Not-Activated';
      this.activated = false;
      this.onSubmit();
    }
  }

}
