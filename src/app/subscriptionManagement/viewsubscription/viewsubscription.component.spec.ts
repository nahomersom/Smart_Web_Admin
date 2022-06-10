import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SubscriptionService } from '../services/subscription.service';
import { ViewsubscriptionComponent } from './viewsubscription.component';


describe('View Subscription component', () => {
    let subService: SubscriptionService;
    let page: ViewsubscriptionComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [SubscriptionService]
      });
      page = new ViewsubscriptionComponent(subService);

      // inject the service
      subService = TestBed.get(SubscriptionService);
    });

    it('Should load Subscribers and populate Data Grid ', () => {
    const response = {
        id: 1,
        fullName: 'Surafel Habte',
        email: 'Sura@gmail.com'
    };

    subService.getSubscriptions().subscribe((data: any) => {
        expect(page.subscriptions).toBeGreaterThan(0);
    });

  });


  });


