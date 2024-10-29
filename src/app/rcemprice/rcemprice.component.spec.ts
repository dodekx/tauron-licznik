import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCEMPriceComponent } from './rcemprice.component';

describe('RCEMPriceComponent', () => {
  let component: RCEMPriceComponent;
  let fixture: ComponentFixture<RCEMPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RCEMPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RCEMPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
