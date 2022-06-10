import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './viewdocument.component.html',
  styleUrls: ['./viewdocument.component.css']
})
export class ViewDocumentComponent implements OnInit {

  public documents: any;
  public document = 'document';
  public columensToDisplay: any[] = [];
  public searchField = 'title';
  public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: true, delete: true};

  constructor(private documentService: DocumentService, private router?: Router) {
    this.columensToDisplay.push({ field: 'title' , headerText: 'Title Of document' , textAlign: 'left', width: 110 });
    this.columensToDisplay.push({ field: 'desc' , headerText: 'Description' , textAlign: 'left', width: 100 ,
     clipMode: 'EllipsisWithTooltip' });
    this.columensToDisplay.push({ field: 'categoryId' , headerText: 'Category' , textAlign: 'left', width: 60 });
    this.columensToDisplay.push({ field: 'language' , headerText: 'Language' , textAlign: 'left', width: 50 });
   }

  ngOnInit() {
    this.documentService.getdocuments()
    .subscribe((data: any[]) => {
      this.documents = data;
    });
  }

  deletedocument(item: any) {
    this.documentService.deletedocument(item)
    .subscribe((response: any) => {
      if(response.status){
        this.ngOnInit();
      }
      
    });
   }

   addNewdocument() {
    this.router.navigate(['dashboard/document/new']);
  }
}
