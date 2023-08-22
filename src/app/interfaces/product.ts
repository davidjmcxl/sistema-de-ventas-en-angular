export interface Product {
  ok:       boolean;
  products: ProductElement[];
}

export interface ProductElement {
  codproducto: number;
  codproveedor?:Number;
  descripcion: string;
  precio:      number;
  existencia:  number;
  proveedor:   string;
  imagen?:string;

}
