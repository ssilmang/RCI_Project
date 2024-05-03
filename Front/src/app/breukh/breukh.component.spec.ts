import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreukhComponent } from './breukh.component';

describe('BreukhComponent', () => {
  let component: BreukhComponent;
  let fixture: ComponentFixture<BreukhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreukhComponent]
    });
    fixture = TestBed.createComponent(BreukhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
