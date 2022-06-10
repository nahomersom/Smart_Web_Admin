import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public events: any;
  public event = 'event';
  public columensToDisplay: any[] = [];
  public searchField = 'title';
  public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = { edit: true, delete: true };

 constructor(private service: EventsService, private router?: Router) {
   this.columensToDisplay.push({ field: 'title' , headerText: 'Event Title' , textAlign: 'left', width: 150 });
   this.columensToDisplay.push({ field: 'date' , headerText: 'Event Date' , textAlign: 'left', width: 40 });
   this.columensToDisplay.push({ field: 'language' , headerText: 'Language' , textAlign: 'left', width: 40 });
 }

 ngOnInit() {
   this.service.gets()
   .subscribe((data: any[]) => {
     this.events = data;
   });
 }

 deleteEvent(item: any) {
   this.service.delete(item.id)
   .subscribe((response: any) => {
     response.status ? this.ngOnInit() : alert(response.message);
   });
 }

 addEvent() {
   this.router.navigate(['dashboard/event/new']);
 }

}
