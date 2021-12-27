import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerBinComponent } from './supprimer-bin.component';

describe('SupprimerBinComponent', () => {
  let component: SupprimerBinComponent;
  let fixture: ComponentFixture<SupprimerBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerBinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
