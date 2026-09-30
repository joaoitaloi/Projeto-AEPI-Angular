import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Locais } from './locais';

describe('Locais', () => {
  let component: Locais;
  let fixture: ComponentFixture<Locais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Locais],
    }).compileComponents();

    fixture = TestBed.createComponent(Locais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
