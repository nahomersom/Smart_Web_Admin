import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AdminService } from '../Services/admin.service';


describe('Admin Login component', () => {
    let beService: AdminService;
    let page: LoginComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [AdminService]
      });
      page = new LoginComponent(beService);

      // inject the service
      beService = TestBed.get(AdminService);

    });


    it('form should have a control', () => {
      expect(page.formgroup.contains('email')).toBeTruthy();
      expect(page.formgroup.contains('password')).toBeTruthy();

  });

  // validation
    it('form control should have a validation required', () => {
    const email = page.formgroup.get('email');
    const password = page.formgroup.get('password');

    email.setValue('');
    expect(email.valid).toBeFalsy();

    password.setValue('');
    expect(password.valid).toBeFalsy();

});


   // expecting the correct(but faked) result: propery with value
    it('Should logged the Admin In successfull and redirect', () => {
    const loggininfo = {
      email: 'admin@gmail.com',
      password: 'abcd1234',
    };
    const email = page.formgroup.get('email');
    const password = page.formgroup.get('password');
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    email.setValue('admin@gmail.com');
    password.setValue('abcd1234');


    beService.loginAuth(loggininfo).subscribe((data: any) => {
      expect(localStorage.getItem('admin')).toBe('true');
      expect(spy).toHaveBeenCalledWith(['admin/dashboard']);

    });
  });


});
