import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewsubscription',
  templateUrl: './viewsubscription.component.html',
  styleUrls: ['./viewsubscription.component.css']
})
export class ViewsubscriptionComponent implements OnInit {

  public subscriptions: any;
  public subscription = 'subscription';
  public columensToDisplay: any[] = [];
  public allowOperation = false;
  public allowToolbar = true;
  public searchField = 'fullName';
  public incomingToolbar = [{ text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: false, delete: false};

 constructor(private subscriptionService: SubscriptionService, private router?: Router) {
   this.columensToDisplay.push({ field: 'fullName' , headerText: 'Subscriber Full Name' , textAlign: 'Left', width: 60 });
   this.columensToDisplay.push({ field: 'email' , headerText: 'Email Address' , textAlign: 'Left', width: 60 });
   this.columensToDisplay.push({ field: 'language' , headerText: 'Language Preference' , textAlign: 'Left', width: 60 });
 }

 ngOnInit() {
   this.subscriptionService.getSubscriptions()
   .subscribe((data: any[]) => {
     this.subscriptions = data;
   });
 }

}
