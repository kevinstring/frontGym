import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdminsComponent } from './menu-admins.component';

describe('MenuAdminsComponent', () => {
  let component: MenuAdminsComponent;
  let fixture: ComponentFixture<MenuAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
