import { Component, OnInit } from '@angular/core';
import { CataService } from '../cata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})

export class ViewcategoryComponent implements OnInit {
   public catagories: any;
   public category = 'category';
   public columensToDisplay: any[] = [];
   public searchField = 'title';
   public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
   public incomingCommand = {edit: true, delete: true};

  constructor(private cataService: CataService, private router?: Router) {
    this.columensToDisplay.push({ field: 'title' , headerText: 'Title Of Category' , textAlign: 'left', width: 90 });
    this.columensToDisplay.push({ field: 'desc' , headerText: 'Description' , textAlign: 'left', width: 100 ,
     clipMode: 'EllipsisWithTooltip' });
    this.columensToDisplay.push({ field: 'show_events' , headerText: 'Show Events' , textAlign: 'left', width: 90 });
    this.columensToDisplay.push({ field: 'status' , headerText: 'isDisabled ?' , textAlign: 'left', width: 50 ,
     displayAsCheckBox: 'true' });
  }

  ngOnInit() {
    this.cataService.getAllCategories()
    .subscribe((data: any) => {
      this.catagories = data;
    });
  }

  deleteCategory(item: any) {
    this.cataService.deletecategory(item.id)
    .subscribe((response: any) => {
      if(response.status){
        this.ngOnInit();
      }
    });
  }

  addNewCategory() {
    this.router.navigate(['dashboard/category/new']);
  }

}
