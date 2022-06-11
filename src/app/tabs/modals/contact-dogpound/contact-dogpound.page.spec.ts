import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactDogpoundPage } from './contact-dogpound.page';

describe('ContactDogpoundPage', () => {
  let component: ContactDogpoundPage;
  let fixture: ComponentFixture<ContactDogpoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDogpoundPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDogpoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
