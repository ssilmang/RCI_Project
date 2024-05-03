import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateurComponent } from './indicateur.component';

describe('IndicateurComponent', () => {
  let component: IndicateurComponent;
  let fixture: ComponentFixture<IndicateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicateurComponent]
    });
    fixture = TestBed.createComponent(IndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
