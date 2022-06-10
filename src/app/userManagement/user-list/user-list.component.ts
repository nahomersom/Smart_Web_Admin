import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public actors: any;
  public actor = 'actors';
  public columensToDisplay: any[] = [];
  public searchField = 'fullName';
  public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: true, delete: true};

  constructor(private beService: BackendService, private router?: Router) {
    this.columensToDisplay.push({ field: 'fullName' , headerText: 'Actor Full Name' , textAlign: 'left', width: 100 });
    this.columensToDisplay.push({ field: 'email' , headerText: 'Actor Email' , textAlign: 'left', width: 100 });
    this.columensToDisplay.push({ field: 'status' , headerText: 'Account Status' , textAlign: 'left', width: 50 });
   }

  ngOnInit() {
    this.beService.getactors()
    .subscribe((data: any[]) => {
      this.actors = data;
    });
  }

  deleteActor(item: any) {
    this.beService.deleteactors(item.id)
    .subscribe((data: any[]) => {
      this.ngOnInit();
    });
  }

   addNewActor() {
    this.router.navigate(['dashboard/newUser']);
  }

}
