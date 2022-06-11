import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteProfilePage } from './delete-profile.page';

describe('DeleteProfilePage', () => {
  let component: DeleteProfilePage;
  let fixture: ComponentFixture<DeleteProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
