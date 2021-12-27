import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEtatComponent } from './change-etat.component';

describe('ChangeEtatComponent', () => {
  let component: ChangeEtatComponent;
  let fixture: ComponentFixture<ChangeEtatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeEtatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
