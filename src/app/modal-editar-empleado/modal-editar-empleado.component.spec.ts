import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalEditarEmpleadoComponent } from './modal-editar-empleado.component';

describe('ModalEditarEmpleadoComponent', () => {
  let component: ModalEditarEmpleadoComponent;
  let fixture: ComponentFixture<ModalEditarEmpleadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarEmpleadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEditarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
