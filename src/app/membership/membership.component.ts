import { Component, OnInit } from '@angular/core';
import { MembershipService } from './membership.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  public members: any;
  public member = 'member';
  public columensToDisplay: any[] = [];
  public searchField = 'fullName';
  public incomingToolbar = [{ text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: true};

  public columen_for_detail = 'email';

  constructor(private membershipService: MembershipService, private router?: Router) {
    this.columensToDisplay.push({ field: 'fullName' , headerText: 'Full Name' , textAlign: 'left', width: 90 });
    this.columensToDisplay.push({ field: 'email' , headerText: 'Email Address' , textAlign: 'left', width: 90 });
    this.columensToDisplay.push({ field: 'phone' , headerText: 'Phone Number' , textAlign: 'left', width: 90 });
    this.columensToDisplay.push({ field: 'status' , headerText: 'Activation Status' , textAlign: 'left', width: 90 });
  }

  ngOnInit() {
    this.membershipService.getmembers()
    .subscribe((data: any[]) => {
      this.members = data;
    });
  }


}
