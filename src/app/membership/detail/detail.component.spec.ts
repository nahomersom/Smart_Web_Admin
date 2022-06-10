import { Router, ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembershipService } from '../membership.service';
import { DetailComponent } from './detail.component';

describe('Detail membership component', () => {
    let membershipService: MembershipService;
    let router: Router;
    let actRoute: ActivatedRoute;
    let page: DetailComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [MembershipService]
      });

      // inject the service
      membershipService = TestBed.get(MembershipService);
      router = TestBed.get(Router);
      actRoute = TestBed.get(ActivatedRoute);
      page = new DetailComponent(membershipService, router, actRoute);

    });


    it(' : Should Update members status successfull and redirect the to list', () => {
        const memberData = {
            id: '11',
            fullName: 'Dawit Mulugeta',
            email: 'davemul@gmail.com',
            password: 'e19d5cd5af0378da05f63f891c7467af',
            gender: 'Male',
            phone: '091046792',
            member: 'True',
            status: 'Not-Activated',
            created_date: '2019-08-02 15:00:07',
            updated_date: '2019-08-08 13:27:49',
        };

        const spy = spyOn(router, 'navigate');
        membershipService.updatemember(memberData).subscribe((data: any) => {
            expect(spy).toHaveBeenCalledWith(['dashboard/membership']);
        });
    });

    it(' : Should activate the members', () => {
        const spy = spyOn(page, 'onSubmit');
        page.currentEditingID = 1;
        page.activate();
        expect(page.activationStatus).toBe('Activated');
        expect(page.activated).toBeTruthy();
        expect(spy).toHaveBeenCalled();
    });

    it(' : Should Deactivate the members', () => {
        const spy = spyOn(page, 'onSubmit');
        page.currentEditingID = 1;
        page.deactivate();
        expect(page.activationStatus).toBe('Not-Activated');
        expect(page.activated).toBeFalsy();
        expect(spy).toHaveBeenCalled();
    });

});
