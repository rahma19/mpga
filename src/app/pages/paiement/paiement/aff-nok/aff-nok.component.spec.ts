import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffNokComponent } from './aff-nok.component';

describe('AffNokComponent', () => {
  let component: AffNokComponent;
  let fixture: ComponentFixture<AffNokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffNokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffNokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
