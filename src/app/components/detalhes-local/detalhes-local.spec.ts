import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesLocal } from './detalhes-local';

describe('DetalhesLocal', () => {
  let component: DetalhesLocal;
  let fixture: ComponentFixture<DetalhesLocal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesLocal],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesLocal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
