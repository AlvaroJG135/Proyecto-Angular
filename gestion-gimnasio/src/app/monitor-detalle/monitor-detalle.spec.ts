import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorDetalle } from './monitor-detalle';

describe('MonitorDetalle', () => {
  let component: MonitorDetalle;
  let fixture: ComponentFixture<MonitorDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
