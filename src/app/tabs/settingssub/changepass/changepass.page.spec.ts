import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangepassPage } from './changepass.page';

describe('ChangepassPage', () => {
  let component: ChangepassPage;
  let fixture: ComponentFixture<ChangepassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangepassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
