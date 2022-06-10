import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentService } from '../document.service';
import { ViewDocumentComponent } from './viewdocument.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


describe('View Document component', () => {
    let documentService: DocumentService;
    let router: Router;
    let page: ViewDocumentComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [DocumentService]
      });

      // inject the service
      documentService = TestBed.get(DocumentService);
      router = TestBed.get(Router);
      page = new ViewDocumentComponent(documentService, router);

    });

    it('Should load Document items and populate Data Grid ', () => {
    const response = {
        id: '5',
        title: 'a',
        desc: 'a',
        categoryId: 'News',
        language: 'English',
        parentId: '4',
        document:  environment.baseUrl + '/uploads/document/1565105264.docx',
        documentName: '1565105264.docx',
        status: 'True',
        memberOnly: 'False',
        created_date: '2019-08-06 18:27:57',
        updated_date: '2019-08-12 14:47:54'
    };

    documentService.getdocuments().subscribe((data: any) => {
        expect(page.documents).toBeGreaterThan(0);
    });

  });

    it('Should delete Document item', () => {
        documentService.deletedocument(1).subscribe((data: any) => {
        page.ngOnInit();
    });

  });

});
