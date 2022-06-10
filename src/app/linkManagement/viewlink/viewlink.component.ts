import { Component, OnInit } from '@angular/core';
import { LinkService } from '../service/link.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewlink',
  templateUrl: './viewlink.component.html',
  styleUrls: ['./viewlink.component.css']
})
export class ViewlinkComponent implements OnInit {

  public links: any;
  public link = 'link';
  public columensToDisplay: any[] = [];
  public searchField = 'title';
  public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: true, delete: true};

 constructor(private linkService: LinkService, private router?: Router) {
   this.columensToDisplay.push({ field: 'title' , headerText: 'Quick Link Title' , textAlign: 'left', width: 120 });
   this.columensToDisplay.push({ field: 'desc' , headerText: 'Description' , textAlign: 'left', width: 90 ,
    clipMode: 'EllipsisWithTooltip' });
   this.columensToDisplay.push({ field: 'language' , headerText: 'Language' , textAlign: 'left', width: 40 });
   this.columensToDisplay.push({ field: 'status' , headerText: 'Status' , textAlign: 'left', width: 40 ,
    displayAsCheckBox: 'true' });
 }

 ngOnInit() {
   this.linkService.getlinks()
   .subscribe((data: any[]) => {
     this.links = data;
   });
 }

 deleteLink(item: any) {
   this.linkService.deletelink(item.id)
   .subscribe((response: any) => {
     if(response.status){
       this.ngOnInit();
     }
     
   });
 }

 addNewLink() {
   this.router.navigate(['dashboard/link/new']);
 }

}
