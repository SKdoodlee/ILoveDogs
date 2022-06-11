import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeeprofilePage } from './seeprofile.page';

describe('SeeprofilePage', () => {
  let component: SeeprofilePage;
  let fixture: ComponentFixture<SeeprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
