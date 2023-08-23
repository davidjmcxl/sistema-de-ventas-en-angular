import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerElement } from 'src/app/interfaces/customer.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { ProductElement } from '../../interfaces/product';
import { SalesService } from 'src/app/services/sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss']
})
export class NewSaleComponent implements OnInit {
  public formCustomer!:FormGroup;
  public formProduct!:FormGroup;
  public customer!:CustomerElement;
  public product!:ProductElement;
  private fb = inject(FormBuilder);
  private customerService = inject(CustomersService);
  private authService= inject(AuthService);
  private productService = inject(ProductService);
  private saleService = inject(SalesService);
  displayedColumns: string[] = [
    'codproducto',
    'descripcion',
    'cantidad',
    'precio',
    'total',
    'acciones',
  ];
  data: any[]=[];
  dataSource = new MatTableDataSource<ProductElement>();
  ngOnInit(): void {
    this.getProductTemp();
    const usuario_id=this.authService.id;
    this.formCustomer= this.fb.group(
      {
        nombre: ['',Validators.required],
        nit: ['',Validators.required],
        telefono: ['',Validators.required],
        direccion: ['',Validators.required],
        usuario_id
      }
    )
    this.formProduct = this.fb.group({
      codproducto:        new FormControl({value:'',disabled:false},Validators.required),
      cantidad:     new FormControl({value:0,disabled:false},Validators.required),
      descripcion:  new FormControl({value:'',disabled:true},Validators.required),
      precio:     new FormControl({value:0,disabled:true},Validators.required),
      total:      new FormControl({value:0,disabled:true},Validators.required),
    });

  }
  registerCustomer(){
    console.log(this.formCustomer.value);

    if(this.formCustomer.valid){
      this.customerService.createCustomer(this.formCustomer.value).subscribe(resp=>{
        Swal.fire('Success', 'Cliente creado Correctamente', 'success');
        this.searchCustomer(this.formCustomer.get("nit")?.value);
      })
    }

  }
  searchCustomer(termino:string){


      this.customerService.searchCustomer(termino).subscribe((customer:any)=>{
      this.customer = customer.customer[0];
      if(this.customer==undefined){
        this.formCustomer= this.fb.group(
          {
            nombre:     new FormControl({value:'',disabled:false},Validators.required),
            nit:        new FormControl({value:termino,disabled:false},Validators.required),
            telefono:   new FormControl({value:'',disabled:false},Validators.required),
            direccion:  new FormControl({value:'',disabled:false},Validators.required),
            usuario_id:this.authService.id
          }
        )
      }
      if(this.customer){
        const {nombre,telefono,direccion}=this.customer;

        this.formCustomer= this.fb.group(
          {
            nombre: new FormControl({value:nombre,disabled:true},Validators.required),
            nit: new FormControl({value:termino,disabled:false},Validators.required),
            telefono:new FormControl({value:telefono,disabled:true},Validators.required),
            direccion: new FormControl({value:direccion,disabled:true},Validators.required),

          }
        )
      }

      })


  }
  addProduct(){


    this.saleService.addProductTemp(this.formProduct.value).subscribe(({resp})=>{



      this.data = resp[0];



      this.dataSource = new MatTableDataSource<ProductElement>(this.data);

    })


  }
  searchProduct(id:string,cantidad:any){
    if(id==""){
      return
    }
    this.productService.searchProductById(id).subscribe((product:any)=>{
     this.product=product.product[0];
     if(this.product){
      const{codproducto,descripcion,precio}=this.product;

        this.formProduct = this.fb.group({
          codproducto:        new FormControl({value:codproducto,disabled:false},Validators.required),
          cantidad:     new FormControl({value:cantidad,disabled:false},Validators.required),
          descripcion:  new FormControl({value:descripcion,disabled:true},Validators.required),
          precio:     new FormControl({value:precio,disabled:true},Validators.required),
          total:      new FormControl({value:precio*cantidad as number,disabled:true},Validators.required),
        });
      }

    })

  }
  getProductTemp(){
    this.saleService.getProuctTemp().subscribe(products=>{
      this.data = products.products;
      console.log(this.data);

      this.dataSource = new MatTableDataSource<any>(this.data);
    })
  }
  deleteProduct(id:number){
   this.saleService.deleteProductTemp(id).subscribe(()=>{
    this.getProductTemp();
   });


  }
  createVenta(){
    const codcliente =this.customer.idcliente;
    const id_usuario= this.authService.id;

   const body={codcliente,id_usuario}
    this.saleService.proccessSales(body).subscribe(resp=>{
      console.log(resp);

      Swal.fire('Success', 'Venta creada Correctamente', 'success');
      this.getProductTemp();
      this.formCustomer.reset();
      this.formProduct.reset();
    })
  }
  cancel(){
    this.saleService.anularSales().subscribe(resp=>{
      console.log(resp);

      Swal.fire('Success', 'Venta cancelada Correctamente', 'success');
      this.getProductTemp();
      this.formCustomer.reset();
      this.formProduct.reset();
    })
  }
}

