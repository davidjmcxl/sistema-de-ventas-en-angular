import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomerElement } from 'src/app/interfaces/customer.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ValidFieldService } from 'src/app/services/valid-field.service';
import { CustomersService } from '../../services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  @ViewChild('contenidoUpdate', { static: false })
  contenidoTemplateRef!: TemplateRef<any>;
  @ViewChild('contenidoCreate', { static: false })
  contenidoTemplateRefCreate!: TemplateRef<any>;
  displayedColumns: string[] = [
    'idcliente',
    'nit',
    'nombre',
    'telefono',
    'direccion',
    'acciones',

  ];
  data!: CustomerElement[];
  dataSource = new MatTableDataSource<CustomerElement>();
  public modal = inject(NgbModal);
  public dataModal!: CustomerElement;
  public idCustomer: number = 0;
  public modalForm!: FormGroup;
  public modalFormCreate!: FormGroup;
  public termino: string = '';
  modalref!: NgbModalRef;
  modalrefCreate!: NgbModalRef;
  private fb = inject(FormBuilder);
  private customersServices= inject(CustomersService);
  private authService=inject(AuthService);
  private validFieldService = inject(ValidFieldService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() { }

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    this.customersServices.getCustomers().subscribe(({ customers }) => {
      this.data = customers;
      this.dataSource = new MatTableDataSource<CustomerElement>(this.data);
      console.log(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  searchCustomer(termino: string) {
    if (termino == '') {
      return this.getCustomers();
    }
    this.customersServices.searchCustomer(termino).subscribe((customer: any) => {
      this.data = customer.customer;
      this.dataSource = new MatTableDataSource<CustomerElement>(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openModalCreateProvider() {
    this.modalrefCreate = this.modal.open(this.contenidoTemplateRefCreate, {
      centered: true,
    });
    this.modalFormCreate = this.fb.group({
      nombre: ['', Validators.required],
      nit: ['',[ Validators.required]],
      telefono: ['', Validators.required],
      direccion: ['', [Validators.required]],
      usuario_id:[this.authService.id],

    });
  }
  openModalUpdate(customer: CustomerElement) {
    this.dataModal = customer;
    console.log(this.dataModal);


    this.modalref = this.modal.open(this.contenidoTemplateRef, {
      centered: true,
    });
    if(this.dataModal){

      const{nombre,nit,telefono,direccion,idcliente}=this.dataModal;
      this.idCustomer=idcliente;
      const usuario_id=this.authService.id;

      this.modalForm = this.fb.group({nombre,nit,telefono,direccion,usuario_id});

    }

    }

  deleteCustomer(customer: CustomerElement) {
    Swal.fire({
      title: `Esta seguro que desea eliminar el Proveedor
                        ${customer.nombre}`,
      showDenyButton: true,
      showCancelButton: false,

      confirmButtonText: 'Eliminar',
      denyButtonText: `cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const id = customer.idcliente;
        this.customersServices.deleteCustomer(id as number).subscribe((resp)=>{
          console.log(resp);
          this.getCustomers();
        })
        }
       else if (result.isDenied) {
        this.getCustomers();
    }})

   }
  CreateCustomer() {
    if (this.modalFormCreate.value) {
      this.customersServices.createCustomer(this.modalFormCreate.value).subscribe(
          (resp) => {
            console.log(resp);
            this.modalrefCreate.close();
            this.getCustomers();
            Swal.fire('Success', 'Cliente creado Correctamente', 'success');
          }

        );
      }

   }
  updateCustomer() {

    const id=this.idCustomer;
    const customer = this.modalForm.value;
     this.customersServices.updateCustomer(id,customer).subscribe((res)=>{
      console.log(res);

      this.modalref.close();
      this.getCustomers();
      Swal.fire('Success', 'Cliente actualizado Correctamente', 'success');
    })
  }
  isValidField( field: string ){
    return this.validFieldService.isValidField(field,this.modalFormCreate);
    }

  getFieldError( field: string ): string | null {

    return this.validFieldService.getFieldError(field,this.modalFormCreate);
  }

}
