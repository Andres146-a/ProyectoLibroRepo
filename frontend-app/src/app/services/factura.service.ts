import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura.model';
import { Observable } from 'rxjs';
import { NuevaFacturaDTO } from '../models/facturaDTO.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
   private API_URL = 'http://localhost:3000/api/facturas';
  constructor(private http: HttpClient) {}

  listar(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.API_URL);
  }

  create(data: NuevaFacturaDTO): Observable<Factura> {
    return this.http.post<Factura>(this.API_URL, data);
  }

  update(id: number, data: Partial<Factura>): Observable<Factura> {
    return this.http.put<Factura>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}
