import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotageComponent } from './pilotage.component';

describe('PilotageComponent', () => {
  let component: PilotageComponent;
  let fixture: ComponentFixture<PilotageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilotageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
