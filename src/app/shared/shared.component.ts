import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { PageSettingsModel, ToolbarItems, TextWrapSettingsModel, EditSettingsModel, CommandModel,
  click, showEmptyGrid, IRow, Column, SearchSettingsModel } from '@syncfusion/ej2-grids';
import { closest, EmitType } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';


@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  @Input() gridData: any;
  @Input() source: any;
  @Input() allowOperation: any;
  @Input() allowToolbar: any;
  @Input() searchField: any;
  @Input() incomingToolbar: any;
  @Input() incomingCommand: any;

  @Input() columens: any[] = [];


  @Output()
  public deleteRecord: EventEmitter<any> = new EventEmitter();

  @Output()
  public addRecord: EventEmitter<any> = new EventEmitter();


  public currentDeletingItem: any;
  public pageSettings: PageSettingsModel;
  public toolbar: any[];
  public searchOptions: SearchSettingsModel;

  public wrapSettings: TextWrapSettingsModel;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  @ViewChild('grid', { static: true }) public grid: GridComponent;


  // dialogue box
  @ViewChild('ejDialog', { static: true }) ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  public animationSettings: any = { effect: 'Zoom', duration: 400, delay: 0 };

  constructor(private router: Router) { }

    // Initialize the Dialog component target element.
    public initilaizeTarget: EmitType<object> = () => {
      this.targetElement = this.container.nativeElement.parentElement;
      this.ejDialog.content = 'Are you Sure Want to Delete ? ';
    }

    ngOnInit() {
      this.pageSettings = { pageSize: 10 , pageSizes: true};
      this.wrapSettings = { wrapMode: 'Content' };
      this.toolbar = this.incomingToolbar;
      // Disable toolbar items. if the list is news subscribers
      this.disableToolbarItems();

      this.searchOptions = { fields: [this.searchField], operator: 'contains', key: '', ignoreCase: true };

      this.editSettings = { allowAdding: true};
      if (this.incomingCommand.edit === true) {
        this.commands = [{ type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons', click: this.onEdit.bind(this) } }];
      }
      if (this.incomingCommand.delete === true) {
      this.commands = [{ type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons',
      click: this.onDelete.bind(this)}}];
      }
      if (this.incomingCommand.delete === true && this.incomingCommand.edit === true) {
        this.commands = [
          { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons', click: this.onEdit.bind(this) } },
          { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons', click: this.onDelete.bind(this) } },
        ];
      }
      if (this.incomingCommand.delete !== true && this.incomingCommand.edit !== true) {
        this.commands = [];
      }
      this.initilaizeTarget();

    }

    // close dialogue when the user click out side of the box
    ngAfterViewInit(): void {
      document.onclick = (args: any): void => {
            if (args.target.tagName === 'body') {
                this.ejDialog.hide();
            }
        };
    }

    // Hide the Dialog when click the footer button.
    public hideDialog: EmitType<object> = () => {
      this.ejDialog.hide();
  }

  public deleteItem: EmitType<object> = () => {
    this.deleteRecord.emit(this.currentDeletingItem);
    this.ejDialog.hide();
  }

// tslint:disable-next-line: member-ordering
    public buttons: any = [
    {
      click: this.deleteItem.bind(this),
      // Accessing button component properties by buttonModel property
        buttonModel: { content: 'Yes', isPrimary: true}
    },
    {
      click: this.hideDialog.bind(this),
      buttonModel: { content: 'No'}
    }
  ];

    onEdit(args: Event): void {
      const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(closest(args.target as Element, '.e-row').getAttribute('data-uid'));
      const data1: any = rowObj.data;
      this.router.navigate(['/dashboard/' + this.source + '/edit/' + data1.id]);
  }

    onDelete(args: Event): void {
      const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(closest(args.target as Element, '.e-row').getAttribute('data-uid'));
      const data1: any = rowObj.data;
      this.currentDeletingItem = data1;
      this.ejDialog.show();

    }

    addNew(args: ClickEventArgs): void {
      if (args.item.text === 'Add') {
        this.addRecord.emit(args.item.id);
      }
  }

  disableToolbarItems() {
    // this.grid.toolbarModule.enableItems(['Grid_Collapse', 'Grid_Expand'], false); 
  }

}
