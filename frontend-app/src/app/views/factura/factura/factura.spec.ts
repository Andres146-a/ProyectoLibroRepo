import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaComponent } from './factura.component';

describe('Factura', () => {
  let component: FacturaComponent ;
  let fixture: ComponentFixture<FacturaComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
