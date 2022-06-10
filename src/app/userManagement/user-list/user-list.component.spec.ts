import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from '../backend-service';
import { UserListComponent } from './user-list.component';


describe('User List component', () => {
    let beService: BackendService;
    let page: UserListComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [BackendService]
      });

      page = new UserListComponent(beService);
      // inject the service
      beService = TestBed.get(BackendService);
    });

    it('Should load Actors and populate Data Grid ', () => {
    const response = {
        id: 1,
        fullName: 'Surafel Habte G/Mariam',
        email: 'su@gmail.com',
        password: 'abcd1234'
    };

    beService.getactors().subscribe((data: any) => {
        expect(page.actors).toBeGreaterThan(0);
    });

  });

    it('Should delete Actors item', () => {
    beService.deleteactors(1).subscribe((data: any) => {
      page.ngOnInit();
    });
  });

});
