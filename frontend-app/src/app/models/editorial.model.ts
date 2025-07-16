export interface Editorial {
  id_Editorial: number;
  Nombre: string;
  Telefono: string;
  Email: string;
  SitioWeb: string;
}
export interface EditorialUI extends Editorial {
  seleccionado: boolean;
}
