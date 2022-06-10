import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '../menu.service';
import { ViewmenuComponent } from './viewmenu.component';


describe('View Menus component', () => {
    let beService: MenuService;

    let page: ViewmenuComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [MenuService]
      });
      page = new ViewmenuComponent(beService);

      // inject the service
      beService = TestBed.get(MenuService);
    });

    it('Should load Menu items and populate Data Grid ', () => {
    const response = {
      id: 1,
      title: 'Menu 1',
      desc: 'This is Our First  Menu ',
      categoryId: '1',
      language: 'English',
      defaultmenuId: 0,
      status: true,
      other: []

    };

    beService.getmenus().subscribe((data: any) => {
        expect(page.menus).toBeGreaterThan(0);
    });

  });


    it('Should delete Menu item', () => {
    beService.deletemenu(1).subscribe((data: any) => {
      page.ngOnInit();
    });

  });

});
