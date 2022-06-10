import { Component, OnInit, ViewChild } from '@angular/core';
import {
  SidebarComponent,
  NodeSelectEventArgs,
  TreeViewComponent
} from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Router } from '@angular/router';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public data: any = [
    {
      text: 'Category',
      id: '1',
      // avatar: "J",
      icon: 'fas fa-grip-horizontal',
      url: 'dashboard/category/view'
    },
    {
      text: 'Menu',
      id: '2',
      // avatar: "A",
      icon: 'fas fa-th-list',
      url: 'dashboard/menu/view'
    },
    {
      text: 'Article',
      id: '4',
      // avatar: "I",
      icon: 'fas fa-align-left',
      url: 'dashboard/article/view'
    },
    {
      text: 'Quick Link',
      id: '7',
      // avatar: "M",
      icon: 'fas fa-external-link-alt',
      url: 'dashboard/link/view'
    },
    {
      text: 'Media',
      id: '4',
      // avatar: "I",
      icon: 'fas fa-image',
      url: 'dashboard/media/view'
    },
    {
      text: 'Subscription',
      id: '7',
      // avatar: "M",
      icon: 'fab fa-get-pocket',
      url: 'dashboard/subscription'
    },
    {
      text: 'Message',
      id: '7',
      // avatar: "M",
      icon: 'far fa-envelope',
      url: 'dashboard/message'
    },
    {
      text: 'Actors',
      id: '7',
      // avatar: "M",
      icon: 'fas fa-users',
      url: 'dashboard/listUser'
    },
    {
      text: 'Setting',
      id: '8',
      // avatar: "M",
      icon: 'fas fa-cog',
      url: 'dashboard/setting'
    },
    // {
    //   text: 'Membership',
    //   id: '9',
    //   icon: 'fas fa-user-tag',
    //   url: 'dashboard/membership'
    // },
    {
      text: 'Our Team',
      id: '10',
      icon: 'fas fa-user-friends',
      url: 'dashboard/team/view'
    },
    {
      text: 'Documentation',
      id: '11',
      icon: 'fas fa-file',
      url: 'dashboard/document/view'
    },
    {
      text: 'Events',
      id: '12',
      icon: 'fas fa-file',
      url: 'dashboard/event/view'
    }
  ];
  public actorFullName: any;

  constructor(private router?: Router) {}
  title = 'HPRSCOC';


  public items: ItemModel[] = [
    {
      text: 'Sign out',
    },
    {
      text: 'Edit Profile',
    }
  ];

  @ViewChild('sidebar', { static: true }) sidebar: SidebarComponent;
  public type = 'Auto';
  public target = '.content';
  public closeOnDocumentClick = true;

  @ViewChild('togglebtn', { static: true })
  public togglebtn: ButtonComponent;

  @ViewChild('tree')
  public tree: TreeViewComponent;

  ngOnInit(): void {
    if (!this.isEmpety(localStorage.getItem('actorId'))) {
      this.actorFullName = localStorage.getItem('actorFullName');
      document.getElementById('actorFullName').innerHTML =
        '<b>' + this.actorFullName + '</b>';
    }
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  btnClick() {
    if (this.togglebtn.element.classList.contains('e-active')) {
      this.sidebar.hide();
    } else {
      this.sidebar.show();
    }
  }

  closeClick() {
    this.sidebar.hide();
    this.togglebtn.element.classList.remove('e-active');
  }

  navigate(url: any) {
    this.router.navigate([url]);
  }

  public loadRoutingContent(args: NodeSelectEventArgs): void {
    const data: any = this.tree.getTreeData(args.node);
    const routerLink: string = data[0].url;

    if (routerLink) {
      this.router.navigate([routerLink]);
    }
  }

  public select(args: MenuEventArgs) {
    if (args.item.text === 'Sign out') {
      const confirmation = confirm(
        'Are You Sure You Want to Logging Out the System ?'
      );
      if (confirmation) {
        localStorage.clear();
        localStorage.removeItem('actorId');
        localStorage.removeItem('actorEmail');
        localStorage.removeItem('actorFullName');
        localStorage.removeItem('key');
        document.getElementById('actorFullName').innerHTML = '';
        this.actorFullName = '';
        window.location.replace('/login');
      }
    }
    if (args.item.text === 'Edit Profile') {
      this.router.navigate(['/dashboard/profile']);
    }
  }

  isEmpety(str: any) {
    if (str === '' || str === null) {
      return true;
    } else {
      return false;
    }
  }
}
