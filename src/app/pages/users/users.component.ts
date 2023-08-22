import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { UserElement } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ValidFieldService } from 'src/app/services/valid-field.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('contenido', { static: false })
  contenidoTemplateRef!: TemplateRef<any>;
  @ViewChild('contenidoCreate', { static: false })
  contenidoTemplateRefCreate!: TemplateRef<any>;
  displayedColumns: string[] = [
    'idusuario',
    'imagen',
    'nombre',
    'correo',
    'usuario',
    'rol',
    'acciones',
  ];
  data!: UserElement[];
  dataSource = new MatTableDataSource<UserElement>();
  public modal = inject(NgbModal);
  public dataModal!: UserElement;
  public idusuario: number = 0;
  public modalForm!: FormGroup;
  public modalFormCreate!: FormGroup;
  public termino: string = '';
  modalref!: NgbModalRef;
  modalrefCreate!: NgbModalRef;
  private fb = inject(FormBuilder);
  private validFieldService= inject(ValidFieldService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {}

  constructor(private userService: UsersService) {}
  openModal(user: UserElement) {
    this.dataModal = user;

    console.log(this.dataModal);

    this.modalref = this.modal.open(this.contenidoTemplateRef, {
      centered: true,
    });
    if (this.dataModal) {
      let { nombre, correo, usuario, rol, idusuario } = this.dataModal;
      if (rol == 'Administrador') {
        rol = '1';
      } else if (rol == 'Supervisor') {
        rol = '2';
      } else {
        rol = '3';
      }
      this.modalForm = this.fb.group({ nombre, correo, usuario, rol });
      this.idusuario = idusuario;
    }
  }
  getUsers() {
    this.userService.getUsers().subscribe(({ users }) => {
      this.data = users;
      this.dataSource = new MatTableDataSource<UserElement>(this.data);
      console.log(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteUser(user: UserElement) {
    Swal.fire({
      title: `Esta seguro que desea Eliminar el Usuario
                        ${user.usuario}`,
      showDenyButton: true,
      showCancelButton: false,

      confirmButtonText: 'Eliminar',
      denyButtonText: `cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.deleteUser(user.idusuario).subscribe((resp) => {
          console.log(resp);
          this.getUsers();
        });
      } else if (result.isDenied) {
        this.getUsers();
      }
    });
  }
  openModalCreateUser() {
    this.modalrefCreate = this.modal.open(this.contenidoTemplateRefCreate, {
      centered: true,
    });
    this.modalFormCreate = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['',[ Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['0', Validators.required],
      imagen:['no-image.png']
    });
  }
  Create() {
   console.log(this.modalFormCreate.value);

    if (this.modalFormCreate.value) {
    this.userService.createUser(this.modalFormCreate.value).subscribe(
        (resp) => {
          console.log(resp);
          this.modalrefCreate.close();
          this.getUsers();
          Swal.fire('Success', 'Usuario creado Correctamente', 'success');
        }

      );
    }
  }
  update() {
    this.userService
      .updateUser(this.idusuario, this.modalForm.value)
      .subscribe((resp) => {
        console.log(resp);
        this.modalref.close();
        this.getUsers();
        Swal.fire('Success', 'Usuario actualizado Correctamente', 'success');
      });
  }
  searchUser(termino: string) {
    if (termino == '') {
      return this.getUsers();
    }
    this.userService.searchUser(termino).subscribe((user: any) => {
      this.data = user.user;
      this.dataSource = new MatTableDataSource<UserElement>(this.data);
      console.log(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  isValidField( field: string ){
    return this.validFieldService.isValidField(field,this.modalFormCreate);
    }

  getFieldError( field: string ): string | null {

    return this.validFieldService.getFieldError(field,this.modalFormCreate);
  }
}
