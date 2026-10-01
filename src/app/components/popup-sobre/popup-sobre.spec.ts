import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSobre } from './popup-sobre';

describe('PopupSobre', () => {
  let component: PopupSobre;
  let fixture: ComponentFixture<PopupSobre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupSobre],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupSobre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
