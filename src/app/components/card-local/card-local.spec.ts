import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLocal } from './card-local';

describe('CardLocal', () => {
  let component: CardLocal;
  let fixture: ComponentFixture<CardLocal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLocal],
    }).compileComponents();

    fixture = TestBed.createComponent(CardLocal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
