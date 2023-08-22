import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SaleElement } from 'src/app/interfaces/sale.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SalesService } from 'src/app/services/sales.service';
import { ValidFieldService } from 'src/app/services/valid-field.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'fecha',
    'cliente',
    'vendedor',

    'total',
  ];
  data!: SaleElement[];
  dataSource = new MatTableDataSource<SaleElement>();


  public idProvider: number = 0;

  public termino: string = '';

  private fb = inject(FormBuilder);
  private saleService = inject(SalesService);
  private authService=inject(AuthService);
  private validFieldService = inject(ValidFieldService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor() { }

  ngOnInit(): void {
    this.getSales();
  }
  getSales() {
    this.saleService.getVentas().subscribe(({ sales }) => {
      this.data = sales;
      this.dataSource = new MatTableDataSource<SaleElement>(this.data);

      this.dataSource.paginator = this.paginator;
    });
  }
  searchSales(termino: string) {
    if (termino == '') {
      return this.getSales();
    }
    this.saleService.searchSales(termino).subscribe((sale: any) => {
      this.data = sale.sale;
      this.dataSource = new MatTableDataSource<SaleElement>(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }








}
