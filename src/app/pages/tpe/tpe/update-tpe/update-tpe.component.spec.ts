import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTpeComponent } from './update-tpe.component';

describe('UpdateTpeComponent', () => {
  let component: UpdateTpeComponent;
  let fixture: ComponentFixture<UpdateTpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTpeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
