export interface Customer {
  ok:        boolean;
  customers: CustomerElement[];
}

export interface CustomerElement {
  idcliente:  number;
  nit:        number;
  nombre:     string;
  telefono:   number;
  direccion:  string;
  dateaa:     Date;
  usuario_id: number;
  estatus:    number;
}
