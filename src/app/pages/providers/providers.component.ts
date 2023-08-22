import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProviderElement } from 'src/app/interfaces/provider.interface';
import { ProviderService } from 'src/app/services/provider.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ValidFieldService } from 'src/app/services/valid-field.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  @ViewChild('contenidoUpdate', { static: false })
  contenidoTemplateRef!: TemplateRef<any>;
  @ViewChild('contenidoCreate', { static: false })
  contenidoTemplateRefCreate!: TemplateRef<any>;
  displayedColumns: string[] = [
    'codproveedor',
    'proveedor',
    'contacto',
    'telefono',
    'date_add',
    'acciones',
  ];
  data!: ProviderElement[];
  dataSource = new MatTableDataSource<ProviderElement>();
  public modal = inject(NgbModal);
  public dataModal!: ProviderElement;
  public idProvider: number = 0;
  public modalForm!: FormGroup;
  public modalFormCreate!: FormGroup;
  public termino: string = '';
  modalref!: NgbModalRef;
  modalrefCreate!: NgbModalRef;
  private fb = inject(FormBuilder);
  private providerService = inject(ProviderService);
  private authService=inject(AuthService);
  private validFieldService = inject(ValidFieldService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() { }

  ngOnInit(): void {
    this.getProviders();
  }
  getProviders() {
    this.providerService.getProviders().subscribe(({ providers }) => {
      this.data = providers;
      this.dataSource = new MatTableDataSource<ProviderElement>(this.data);
      console.log(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  searchProvider(termino: string) {
    if (termino == '') {
      return this.getProviders();
    }
    this.providerService.searchProvider(termino).subscribe((provider: any) => {
      this.data = provider.provider;
      this.dataSource = new MatTableDataSource<ProviderElement>(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openModalCreateProvider() {
    this.modalrefCreate = this.modal.open(this.contenidoTemplateRefCreate, {
      centered: true,
    });
    this.modalFormCreate = this.fb.group({
      proveedor: ['', Validators.required],
      contacto: ['',[ Validators.required]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      usuario_id:[this.authService.id],

    });
  }
  openModalUpdate(provider: ProviderElement) {
    this.dataModal = provider;
    console.log(this.dataModal);

    this.modalref = this.modal.open(this.contenidoTemplateRef, {
      centered: true,
    });
    if(this.dataModal){

      const{proveedor,contacto,telefono,direccion,codproveedor}=this.dataModal;
      const usuario_id=this.authService.id;
      this.idProvider=codproveedor as number;
      this.modalForm = this.fb.group({proveedor,contacto,telefono,direccion,usuario_id});

    }

    }

  deleteProvider(provider: ProviderElement) {
    Swal.fire({
      title: `Esta seguro que desea eliminar el Proveedor
                        ${provider.proveedor}`,
      showDenyButton: true,
      showCancelButton: false,

      confirmButtonText: 'Eliminar',
      denyButtonText: `cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const id = provider.codproveedor;
        this.providerService.deleteProvider(id as number).subscribe((resp)=>{
          console.log(resp);
          this.getProviders();
        })
        }
       else if (result.isDenied) {
        this.getProviders();
    }})

   }
  CreateProvider() {
    if (this.modalFormCreate.value) {
      this.providerService.createProvider(this.modalFormCreate.value).subscribe(
          (resp) => {
            console.log(resp);
            this.modalrefCreate.close();
            this.getProviders();
            Swal.fire('Success', 'Proveedor creado Correctamente', 'success');
          }

        );
      }

   }
  updateProvider() {
    console.log(this.modalForm.value);

    const id=this.idProvider;
    console.log("id ",id);

    const provider = this.modalForm.value;
     this.providerService.updateProviders(id,provider).subscribe((res)=>{
      console.log(res);

      this.modalref.close();
      this.getProviders();
      Swal.fire('Success', 'Provider actualizado Correctamente', 'success');
    })
  }
  isValidField( field: string ){
    return this.validFieldService.isValidField(field,this.modalFormCreate);
    }

  getFieldError( field: string ): string | null {

    return this.validFieldService.getFieldError(field,this.modalFormCreate);
  }
}
