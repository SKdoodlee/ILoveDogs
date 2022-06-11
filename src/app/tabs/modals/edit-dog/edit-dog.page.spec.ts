import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDogPage } from './edit-dog.page';

describe('EditDogPage', () => {
  let component: EditDogPage;
  let fixture: ComponentFixture<EditDogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
