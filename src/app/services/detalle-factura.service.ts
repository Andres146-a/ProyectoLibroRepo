import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleFactura } from '../models/detalle-factura.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {
  private apiUrl = 'http://localhost:4200/detalleFactura';

  constructor(private http: HttpClient) {}

  getDetalles(): Observable<DetalleFactura[]> {
    return this.http.get<DetalleFactura[]>(this.apiUrl);
  }
}
