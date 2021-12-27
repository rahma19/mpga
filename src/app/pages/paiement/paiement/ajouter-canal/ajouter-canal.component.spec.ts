import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCanalComponent } from './ajouter-canal.component';

describe('AjouterCanalComponent', () => {
  let component: AjouterCanalComponent;
  let fixture: ComponentFixture<AjouterCanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
