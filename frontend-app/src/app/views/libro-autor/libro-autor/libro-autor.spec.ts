import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroAutor } from './libro-autor';

describe('LibroAutor', () => {
  let component: LibroAutor;
  let fixture: ComponentFixture<LibroAutor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroAutor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroAutor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
