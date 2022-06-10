import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { GridModule, PageService, SortService, FilterService, GroupService, ReorderService,
  ResizeService, ToolbarService, CommandColumnService, EditService, SearchService 
} from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';



@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    GridModule,
    DialogModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    GroupService,
    ReorderService,
    ResizeService,
    ToolbarService,
    SearchService,
    CommandColumnService,
    EditService,
  ],
  exports: [SharedComponent],

})
export class SharedModule {

 }
