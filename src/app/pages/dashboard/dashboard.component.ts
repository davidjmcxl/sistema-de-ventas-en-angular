import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  ChartConfiguration,

} from 'chart.js';

import { SalesService } from 'src/app/services/sales.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private saleService = inject(SalesService);

  fecha: string[] = [];
  fechasFormateadas: string[] = [];
  totalesVenta: number[] = [];
  ingreso!:number;
  egreso!:number;
  ganancia!:number;
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: '' }],
  };

  ngOnInit(): void {
   this.getVentasTotales();
   this.getIngresosEgresos();
  }

  getVentasTotales() {
    this.saleService.getDashboard().subscribe((resp) => {
      this.fecha = resp.data[1][0].fecha;
      for (let i = 0; i < resp.data[1].length; i++) {
        let fechaFormateada = '';
        let total = 0;
        const fecha = new Date(resp.data[1][i].fecha);
        total = resp.data[1][i].total;
        fechaFormateada = fecha.toLocaleDateString();

        this.fechasFormateadas.push(fechaFormateada);
        this.totalesVenta.push(total);
      }
      this.barChartData = {
        labels: this.fechasFormateadas,
        datasets: [
          {
            data: this.totalesVenta,
            label: 'Sales',
            backgroundColor: [
              '#6773af',
              '#7985c2',
              '#8c97d5',
              '#9ea8e8',
              '#b0bafb',
            ],
          },
        ],
      };
    });
  }
  getIngresosEgresos() {
    this.saleService.getDashboard().subscribe(({data}) => {

      this.ingreso=data[0][0].ingresos;

      this.egreso=data[0][0].egresos;
      this.ganancia=data[0][0].ganancias;
    })
  }
}
