import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewmenu',
  templateUrl: './viewmenu.component.html',
  styleUrls: ['./viewmenu.component.css']
})
export class ViewmenuComponent implements OnInit {
  public menus: any;
  public menu = 'menu';
  public columensToDisplay: any[] = [];
  public searchField = 'title';
  public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: true, delete: true};

  constructor(private menuService: MenuService, private router?: Router) {
    this.columensToDisplay.push({ field: 'title' , headerText: 'Title Of Menu' , textAlign: 'left', width: 120 });
    this.columensToDisplay.push({ field: 'categoryId' , headerText: 'Category' , textAlign: 'left', width: 60 });
    this.columensToDisplay.push({ field: 'language' , headerText: 'Language' , textAlign: 'left', width: 40 });
    this.columensToDisplay.push({ field: 'status' , headerText: 'Show' , textAlign: 'left', width: 30 ,
     displayAsCheckBox: 'true' });
    
   }

  ngOnInit() {
    this.menuService.getmenus()
    .subscribe((data: any[]) => {
      this.menus = data;
    });
  }

  deleteMenu(item: any) {
    this.menuService.deletemenu(item.id)
    .subscribe((response: any) => {
      if(response.status){
        this.ngOnInit();
      }
      
    });
   }

   addNewMenu() {
    this.router.navigate(['dashboard/menu/new']);
  }
}
