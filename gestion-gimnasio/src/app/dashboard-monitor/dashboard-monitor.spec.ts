import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMonitor } from './dashboard-monitor';

describe('DashboardMonitor', () => {
  let component: DashboardMonitor;
  let fixture: ComponentFixture<DashboardMonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMonitor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMonitor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
