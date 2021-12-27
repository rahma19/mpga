import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBinComponent } from './detail-bin.component';

describe('DetailBinComponent', () => {
  let component: DetailBinComponent;
  let fixture: ComponentFixture<DetailBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
