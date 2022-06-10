import { Component, OnInit } from '@angular/core';
import { MessageService } from './Services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public messages: any;
   public message = 'message';
   public columensToDisplay: any[] = [];
   public allowOperation = true;
   public allowToolbar = false;
   public searchField = 'fullname';
   public incomingToolbar = [{ text: 'Search', tooltipText: 'Search Items'}];
   public incomingCommand = {edit: false, delete: true};

  constructor(private messageService: MessageService, private router?: Router) {
    this.columensToDisplay.push({ field: 'fullname' , headerText: 'Full Name' , textAlign: 'left', width: 70 });
    this.columensToDisplay.push({ field: 'email' , headerText: 'Email' , textAlign: 'left', width: 70 });
    this.columensToDisplay.push({ field: 'subject' , headerText: 'Subject' , textAlign: 'left', width: 50 });
    this.columensToDisplay.push({ field: 'message' , headerText: 'Message' , textAlign: 'left', width: 120,
    clipMode: 'EllipsisWithTooltip'});

  }

  ngOnInit() {
    this.messageService.getMessages()
    .subscribe((data: any[]) => {
      this.messages = data;
    });
  }

  deleteMessage(item: any) {
    this.messageService.deleteMessage(item.id)
    .subscribe((data: any[]) => {
      this.ngOnInit();
    });
  }

}
