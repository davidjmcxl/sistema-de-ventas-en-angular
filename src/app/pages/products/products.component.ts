import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductElement } from 'src/app/interfaces/product';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../interfaces/product';
import { ProviderService } from 'src/app/services/provider.service';
import { ProviderElement } from 'src/app/interfaces/provider.interface';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ValidFieldService } from 'src/app/services/valid-field.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('contenidoUpdate', { static: false })
  contenidoTemplateRef!: TemplateRef<any>;
  @ViewChild('contenidoCreate', { static: false })
  contenidoTemplateRefCreate!: TemplateRef<any>;
  displayedColumns: string[] = [
    'codproducto',
    'proveedor',
    'imagen',
    'descripcion',
    'precio',
    'existencia',

    'acciones',
  ];
  data!: ProductElement[];
  dataSource = new MatTableDataSource<ProductElement>();
  public modal = inject(NgbModal);
  public dataModal!: ProductElement;
  public providers!: ProviderElement[];
  public providerId!: number;
  public idProduct: number = 0;
  public modalForm!: FormGroup;
  public modalFormCreate!: FormGroup;
  public termino: string = '';
  modalref!: NgbModalRef;
  public product!: Product;
  public msgError: string = '';

  public imagenSubir!: File;
  public imgTemp: string = '';
  modalrefCreate!: NgbModalRef;
  private fileUpload = inject(FileUploadService);

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private providerService = inject(ProviderService);
  private validFieldService= inject(ValidFieldService) ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this.getProducts();
    this.getProviders();
  }
  getProducts() {
    this.productService.getProducts().subscribe(({ products }) => {
      this.data = products;
      console.log(this.data);

      this.dataSource = new MatTableDataSource<ProductElement>(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }
  getProviders() {
    this.providerService.getProviders().subscribe(({ providers }) => {
      this.providers = providers;
    });
  }
  searchProduct(termino: string) {
    if (termino == '') {
      return this.getProducts();
    }
    this.productService.searchProduct(termino).subscribe((product: any) => {
      this.data = product.product;
      this.dataSource = new MatTableDataSource<ProductElement>(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openModalCreateProduct() {
    this.modalrefCreate = this.modal.open(this.contenidoTemplateRefCreate, {
      centered: true,
    });
    this.modalFormCreate = this.fb.group({
      proveedor: ['0', [Validators.required,Validators.min(1)]],
      descripcion: ['', [Validators.required]],
      existencia: ['', Validators.required],
      precio: ['', [Validators.required]],
      usuario_id: [this.authService.id],
    });
  }
  openModalUpdate(product: ProductElement) {
    this.dataModal = product;
    this.modalref = this.modal.open(this.contenidoTemplateRef, {
      centered: true,
    });
    if (this.dataModal) {
      const {
        proveedor,
        descripcion,
        existencia,
        precio,
        codproducto,
        codproveedor,
      } = this.dataModal;
      const usuario_id = this.authService.id;
      this.idProduct = codproducto as number;

      this.modalForm = this.fb.group({
        proveedor: codproveedor,
        descripcion,
        existencia,
        precio,
        usuario_id,
      });
    }
  }

  deleteProduct(product: ProductElement) {
    Swal.fire({
      title: `Esta seguro que desea eliminar el producto
                        ${product.descripcion}`,
      showDenyButton: true,
      showCancelButton: false,

      confirmButtonText: 'Eliminar',
      denyButtonText: `cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const id = product.codproducto;
        this.productService.deleteProduct(id as number).subscribe((resp) => {
          console.log(resp);
          this.getProducts();
        });
      } else if (result.isDenied) {
        this.getProducts();
      }
    });
  }
  CreateProduct() {
    console.log(this.imagenSubir);

    if (this.modalFormCreate.valid && this.imagenSubir) {
      this.productService
        .createProduct(this.modalFormCreate.value, this.imagenSubir)
        .then((resp) => {
          console.log(resp);
          this.modalrefCreate.close();
          this.getProducts();
          Swal.fire('Success', 'Producto creado Correctamente', 'success');
        });
    } else {
      this.msgError = 'Debe seleccionar una imagen';
    }
  }
  updateProduct() {
    const id = this.idProduct;
    this.fileUpload
      .actualizarFoto(this.imagenSubir, 'products', id)
      .then((img: any) => {
        console.log(img);
      })
      .catch((err: any) => {
        console.log(err);
      });
    const product = this.modalForm.value;
    this.productService.updateProduct(id, product).subscribe((resp) => {
      console.log(resp);

      this.modalref.close();
      this.getProducts();
      Swal.fire('Success', 'Producto actualizado Correctamente', 'success');
    });
  }

  cambiarImg(event: any) {
    this.imagenSubir = event.target.files[0];

    if (!event.target.files[0]) {
      this.imgTemp = '';
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result as string;
    };
  }

  isValidField( field: string ){
    return this.validFieldService.isValidField(field,this.modalFormCreate);
    }

  getFieldError( field: string ): string | null {

    return this.validFieldService.getFieldError(field,this.modalFormCreate);
  }
}
