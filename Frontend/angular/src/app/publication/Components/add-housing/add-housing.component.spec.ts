import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHousingComponent } from './add-housing.component';

describe('AddHousingComponent', () => {
  let component: AddHousingComponent;
  let fixture: ComponentFixture<AddHousingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHousingComponent]
    });
    fixture = TestBed.createComponent(AddHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
