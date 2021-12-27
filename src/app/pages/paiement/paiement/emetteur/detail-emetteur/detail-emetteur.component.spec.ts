import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmetteurComponent } from './detail-emetteur.component';

describe('DetailEmetteurComponent', () => {
  let component: DetailEmetteurComponent;
  let fixture: ComponentFixture<DetailEmetteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEmetteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmetteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
