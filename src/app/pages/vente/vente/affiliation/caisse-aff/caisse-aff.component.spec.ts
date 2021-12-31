import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseAffComponent } from './caisse-aff.component';

describe('CaisseAffComponent', () => {
  let component: CaisseAffComponent;
  let fixture: ComponentFixture<CaisseAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseAffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaisseAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
