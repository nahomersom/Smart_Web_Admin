import { MessageComponent } from './message.component';
import { MessageService } from './Services/message.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Message View component', () => {
    let messageService: MessageService;
    let page: MessageComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [MessageService]
      });

      // inject the service
      messageService = TestBed.get(MessageService);
      page = new MessageComponent(messageService);

    });

    it(' : Should load Messages and populate Data Grid ', () => {

    messageService.getMessages().subscribe((data: any) => {
        expect(page.messages).toBeGreaterThan(0);
    });

  });

    it(' : Should delete Message', () => {
        messageService.deleteMessage(1).subscribe((data: any) => {
        page.ngOnInit();
    });

  });

});
