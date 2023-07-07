export interface User {
  users: UserElement[];
}

export interface UserElement {
  idusuario: number;
  nombre:    string;
  correo:    string;
  usuario:   string;
  rol:       string;
}
