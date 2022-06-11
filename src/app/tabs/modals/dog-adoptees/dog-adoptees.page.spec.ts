import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DogAdopteesPage } from './dog-adoptees.page';

describe('DogAdopteesPage', () => {
  let component: DogAdopteesPage;
  let fixture: ComponentFixture<DogAdopteesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogAdopteesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DogAdopteesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
