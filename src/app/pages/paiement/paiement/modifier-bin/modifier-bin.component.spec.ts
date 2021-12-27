import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBinComponent } from './modifier-bin.component';

describe('ModifierBinComponent', () => {
  let component: ModifierBinComponent;
  let fixture: ComponentFixture<ModifierBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierBinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
