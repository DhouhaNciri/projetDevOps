import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueColocationComponent } from './historique-colocation.component';

describe('HistoriqueColocationComponent', () => {
  let component: HistoriqueColocationComponent;
  let fixture: ComponentFixture<HistoriqueColocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueColocationComponent]
    });
    fixture = TestBed.createComponent(HistoriqueColocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
