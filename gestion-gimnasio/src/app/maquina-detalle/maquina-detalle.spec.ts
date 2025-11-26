import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaDetalle } from './maquina-detalle';

describe('MaquinaDetalle', () => {
  let component: MaquinaDetalle;
  let fixture: ComponentFixture<MaquinaDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaquinaDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaquinaDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
