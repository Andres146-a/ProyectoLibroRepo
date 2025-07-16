// src/app/services/reporte.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  getLibrosMasVendidosPorCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/libros-mas-vendidos`);
  }
  getVentasMensualesFiltradas(sucursal: string, rangoDias: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ventas-mensuales-filtradas`, {
      params: {
        sucursal,
        rango: rangoDias.toString()
      }
    });
  }
getVentasSemanales(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/ventas-semanales`);
}



  getVentasMensuales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ventas-mensuales`);
  }

  getLibrosBestSellers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/best-sellers`);
  }

  getLibrosBajaRotacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/baja-rotacion`);
  }
  
}
