import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {

  public teams: any;
  public team = 'team';
  public columensToDisplay: any[] = [];
  public searchField = 'title';
  public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: true, delete: true};

  constructor(private teamService: TeamService, private router?: Router) {
    this.columensToDisplay.push({ field: 'fullName' , headerText: 'Full Name' , textAlign: 'left', width: 90 });
    this.columensToDisplay.push({ field: 'profession' , headerText: 'Profession' , textAlign: 'left', width: 90 });
    this.columensToDisplay.push({ field: 'email' , headerText: 'Email' , textAlign: 'left', width: 90 });
    this.columensToDisplay.push({ field: 'phone' , headerText: 'Phone Number' , textAlign: 'left', width: 90 });
   }

  ngOnInit() {
    this.teamService.getteams()
    .subscribe((data: any[]) => {
      this.teams = data;
    });
  }

  deleteteam(item: any) {
    this.teamService.deleteteam(item)
    .subscribe((response: any) => {
      if(response.status){
        this.ngOnInit();
      }
    });
   }

   addNewteam() {
    this.router.navigate(['dashboard/team/new']);
  }

}
