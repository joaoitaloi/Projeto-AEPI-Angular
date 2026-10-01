import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaSegura } from './zona-segura';

describe('ZonaSegura', () => {
  let component: ZonaSegura;
  let fixture: ComponentFixture<ZonaSegura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaSegura],
    }).compileComponents();

    fixture = TestBed.createComponent(ZonaSegura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
