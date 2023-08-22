export interface Provider {
  ok:        boolean;
  providers: ProviderElement[];
}

export interface ProviderElement {
  codproveedor?: number;
  proveedor:    string;
  contacto:     string;
  telefono:     number;
  direccion:    string;
  date_add?:     Date;
  usuario_id:   number;
  estatus?:      number;
}
