import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbconnectionsComponent } from './dbconnections.component';

describe('DbconnectionsComponent', () => {
  let component: DbconnectionsComponent;
  let fixture: ComponentFixture<DbconnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbconnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbconnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
