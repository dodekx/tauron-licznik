import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerTypeSelectorComponent } from './prosumer-type-selector.component';

describe('ProsumerTypeSelectorComponent', () => {
  let component: ProsumerTypeSelectorComponent;
  let fixture: ComponentFixture<ProsumerTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProsumerTypeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
