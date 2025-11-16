import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMaquina } from './dashboard-maquina';

describe('DashboardMaquina', () => {
  let component: DashboardMaquina;
  let fixture: ComponentFixture<DashboardMaquina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMaquina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMaquina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
