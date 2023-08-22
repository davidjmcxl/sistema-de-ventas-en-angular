export interface Sale {
  ok:    boolean;
  sales: SaleElement[];
}

export interface SaleElement {
  nofactura:    number;
  fecha:        Date;
  totalfactura: number;
  codcliente:   number;
  estatus:      number;
  vendedor:     string;
  cliente:      string;
}
