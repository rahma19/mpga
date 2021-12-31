import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatailCanalComponent } from './datail-canal.component';

describe('DatailCanalComponent', () => {
  let component: DatailCanalComponent;
  let fixture: ComponentFixture<DatailCanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatailCanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailCanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
