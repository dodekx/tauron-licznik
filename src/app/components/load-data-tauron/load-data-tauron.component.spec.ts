import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataTauronComponent } from './load-data-tauron.component';

describe('LoadDataTauronComponent', () => {
  let component: LoadDataTauronComponent;
  let fixture: ComponentFixture<LoadDataTauronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadDataTauronComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadDataTauronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
