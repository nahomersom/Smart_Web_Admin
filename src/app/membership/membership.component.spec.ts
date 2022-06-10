import { MembershipService } from './membership.service';

import { Router } from '@angular/router';

import { MembershipComponent } from './membership.component';

import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('membrship component', () => {
    let membershipService: MembershipService;
    let router: Router;
    let page: MembershipComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [MembershipService]
      });

      // inject the service
      membershipService = TestBed.get(MembershipService);
      router = TestBed.get(Router);
      page = new MembershipComponent(membershipService, router);

    });

    it(' : Should load all members and populate Data Grid ', () => {
    const response = {
        id: '11',
        fullName: 'Dawit Mulugeta',
        email: 'davemul@gmail.com',
        password: 'e19d5cd5af0378da05f63f891c7467af',
        gender: 'Male',
        phone: '091046792',
        member: 'True',
        status: 'Activated',
        created_date: '2019-08-02 15:00:07',
        updated_date: '2019-08-08 13:27:49',
    };

    membershipService.getmembers().subscribe((data: any) => {
        expect(page.members).toBeGreaterThan(0);
    });

  });

});
