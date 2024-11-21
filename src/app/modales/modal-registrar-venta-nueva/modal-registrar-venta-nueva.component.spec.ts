import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRegistrarVentaNuevaComponent } from './modal-registrar-venta-nueva.component';

describe('ModalRegistrarVentaNuevaComponent', () => {
  let component: ModalRegistrarVentaNuevaComponent;
  let fixture: ComponentFixture<ModalRegistrarVentaNuevaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistrarVentaNuevaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRegistrarVentaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
