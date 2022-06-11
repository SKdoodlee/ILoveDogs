import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DogProfilePage } from './dog-profile.page';

describe('DogProfilePage', () => {
  let component: DogProfilePage;
  let fixture: ComponentFixture<DogProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DogProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
