import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AdminService } from '../Services/admin.service';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import {
  SidebarModule,
  TreeViewModule
} from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { PageIdentityComponent } from 'src/app/page-identity/page-identity.component';
import { BreadCrumbComponent } from 'src/app/bread-crumb/bread-crumb.component';
import { PageTitleComponent } from 'src/app/page-title/page-title.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'category/new',
        loadChildren:
          () => import('src/app/categoryManagement/createcategory/createcategory.module').then(m => m.CreatecategoryModule),
        data: { title: 'Category', breadCrum: 'Add' }
      },
      {
        path: 'category/edit/:id',
        loadChildren:
          () => import('src/app/categoryManagement/createcategory/createcategory.module').then(m => m.CreatecategoryModule),
        data: { title: 'Category', breadCrum: 'Edit' }
      },
      {
        path: 'category/view',
        loadChildren:
          () => import('src/app/categoryManagement/viewcategory/viewcategory.module').then(m => m.ViewcategoryModule),
        data: { title: 'Category', breadCrum: 'View' }
      },
      {
        path: 'menu/new',
        loadChildren:
          () => import('src/app/menuManagement/createmenu/createmenu.module').then(m => m.CreateMenuModule),
        data: { title: 'Menu', breadCrum: 'Add' }
      },
      {
        path: 'menu/edit/:id',
        loadChildren:
          () => import('src/app/menuManagement/createmenu/createmenu.module').then(m => m.CreateMenuModule),
        data: { title: 'Menu', breadCrum: 'Edit' }
      },
      {
        path: 'menu/view',
        loadChildren:
          () => import('src/app/menuManagement/viewmenu/viewmenu.module').then(m => m.ViewmenuModule),
        data: { title: 'Menu', breadCrum: 'View' }
      },
      {
        path: 'article/new',
        loadChildren:
          () => import('src/app/articleManagement/createarticle/create-article.module').then(m => m.CreateArticleModule),
        data: { title: 'Article', breadCrum: 'Add' }
      },
      {
        path: 'article/view',
        loadChildren:
          () => import('src/app/articleManagement/viewarticle/view-article.module').then(m => m.ViewArticleModule),
        data: { title: 'Article', breadCrum: 'View' }
      },
      {
        path: 'article/edit/:id',
        loadChildren:
          () => import('src/app/articleManagement/createarticle/create-article.module').then(m => m.CreateArticleModule),
        data: { title: 'Article', breadCrum: 'Edit' }
      },
      {
        path: 'link/new',
        loadChildren:
          () => import('src/app/linkManagement/createlink/create-link.module').then(m => m.CreateLinkModule),
        data: { title: 'Link', breadCrum: 'Add' }
      },
      {
        path: 'link/view',
        loadChildren:
          () => import('src/app/linkManagement/viewlink/view-link.module').then(m => m.ViewlinkModule),
        data: { title: 'Link', breadCrum: 'View' }
      },
      {
        path: 'link/edit/:id',
        loadChildren:
          () => import('src/app/linkManagement/createlink/create-link.module').then(m => m.CreateLinkModule),
        data: { title: 'Link', breadCrum: 'Edit' }
      },
      {
        path: 'subscription',
        loadChildren:
          () => import('src/app/subscriptionManagement/viewsubscription/subscription.module').then(m => m.SubscriptionModule),
        data: { title: 'Subscription', breadCrum: 'Subscription' }
      },
      {
        path: 'media/new',
        loadChildren:
          () => import('src/app/mediaManagement/createmedia/createmedia.module').then(m => m.CreateMediaModule),
        data: { title: 'Media', breadCrum: 'Add' }
      },
      {
        path: 'media/view',
        loadChildren:
          () => import('src/app/mediaManagement/viewmedia/view-media.module').then(m => m.ViewMediaModule),
        data: { title: 'Media', breadCrum: 'View' }
      },
      {
        path: 'media/edit/:id',
        loadChildren:
          () => import('src/app/mediaManagement/createmedia/createmedia.module').then(m => m.CreateMediaModule),
        data: { title: 'Media', breadCrum: 'Edit' }
      },
      {
        path: 'message',
        loadChildren: () => import('src/app/message/message.module').then(m => m.MessageModule),
        data: { title: 'Messages', breadCrum: 'Messages' }
      },
      {
        path: 'listUser',
        loadChildren:
          () => import('src/app/userManagement/user-list/user-list.module').then(m => m.UserListModule),
        data: { title: 'Users', breadCrum: 'Users' }
      },
      {
        path: 'newUser',
        loadChildren:
          () => import('src/app/userManagement/signup/signup.module').then(m => m.SignupModule),
        data: { title: 'Sign Up', breadCrum: 'Sign up' }
      },
      {
      path: 'actors/edit/:id',
      loadChildren: () => import('src/app/userManagement/signup/signup.module').then(m => m.SignupModule), data: { title: 'Edit', breadCrum: 'Edit Actor' }
      },
      {
        path: 'changePassword',
        loadChildren:
          () => import('src/app/userManagement/change-password/change-password.module').then(m => m.ChangePasswordModule),
        data: { title: 'Change password', breadCrum: 'Password' }
      },
      {
        path: 'profile',
        loadChildren:
          () => import('src/app/userManagement/user-profile/user-profile.module').then(m => m.UserProfileModule),
        data: { title: 'Profile', breadCrum: 'Profile' }
      },
      {
        path: 'membership',
        loadChildren: () => import('src/app/membership/membership.module').then(m => m.MembershipModule),
        data: { title: 'Membership', breadCrum: 'View' }
      },
      {
        path: 'member/edit/:id',
        loadChildren: () => import('src/app/membership/detail/detail.module').then(m => m.DetailModule),
        data: { title: 'Membership', breadCrum: 'Edit' }
      },
      {
        path: 'team/view',
        loadChildren: () => import('src/app/ourTeam/viewTeam/viewTeam.module').then(m => m.ViewTeamModule),
        data: { title: 'Team', breadCrum: 'View' }
      },
      {
        path: 'team/new',
        loadChildren: () => import('src/app/ourTeam/newTeam/newTeam.module').then(m => m.NewTeamModule),
        data: { title: 'Team', breadCrum: 'New' }
      },
      {
        path: 'team/edit/:id',
        loadChildren: () => import('src/app/ourTeam/newTeam/newTeam.module').then(m => m.NewTeamModule),
        data: { title: 'Team', breadCrum: 'Edit' }
      },
      {
        path: 'document/new',
        loadChildren: () => import('src/app/DocumentManagement/create/createdocument.module').then(m => m.CreateDocumentModule),
        data: { title: 'Document', breadCrum: 'New' }
      },
      {
        path: 'document/view',
        loadChildren: () => import('src/app/DocumentManagement/view/viewdocument.module').then(m => m.ViewDocumentModule),
        data: { title: 'Document', breadCrum: 'View' }
      },
      {
        path: 'document/edit/:id',
        loadChildren: () => import('src/app/DocumentManagement/create/createdocument.module').then(m => m.CreateDocumentModule),
        data: { title: 'Document', breadCrum: 'Edit' }
      },
      {
        path: 'event/new',
        loadChildren: () => import('src/app/eventsManagement/create/create.module').then(m => m.CreateModule),
        data: { title: 'Events', breadCrum: 'New' }
      },
      {
        path: 'event/view',
        loadChildren: () => import('src/app/eventsManagement/view/view.module').then(m => m.ViewModule),
        data: { title: 'Events', breadCrum: 'View' }
      },
      {
        path: 'event/edit/:id',
        loadChildren: () => import('src/app/eventsManagement/create/create.module').then(m => m.CreateModule),
        data: { title: 'Events', breadCrum: 'Edit' }
      },
      {
        path: 'setting',
        loadChildren:
          () => import('src/app/setting/setting.module').then(m => m.SettingModule),
        data: { title: 'Setting', breadCrum: 'Setting' }
      },
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    PageIdentityComponent,
    BreadCrumbComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TextBoxModule,
    ButtonModule,
    SidebarModule,
    ListViewModule,
    TreeViewModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [AdminService],
  exports: [
    RouterModule,
    PageIdentityComponent,
    BreadCrumbComponent,
    PageTitleComponent
  ]
})
export class DashboardModule {}
