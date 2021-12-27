import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpeComponent } from './tpe.component';

describe('TpeComponent', () => {
  let component: TpeComponent;
  let fixture: ComponentFixture<TpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
