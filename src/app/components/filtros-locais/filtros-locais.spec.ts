import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosLocais } from './filtros-locais';

describe('FiltrosLocais', () => {
  let component: FiltrosLocais;
  let fixture: ComponentFixture<FiltrosLocais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosLocais],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosLocais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
