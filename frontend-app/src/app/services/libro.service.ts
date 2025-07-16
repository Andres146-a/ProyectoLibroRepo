import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../models/libro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private API_URL = 'http://localhost:3000/api/libros'; // Ajusta si tu backend corre en otro puerto

  constructor(private http: HttpClient) {}

  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.API_URL);
  }

  update(id: number, data: Partial<Libro>): Observable<Libro> {
    return this.http.put<Libro>(`${this.API_URL}/${id}`, data);
  }

  create(data: Partial<Libro>): Observable<Libro> {
    return this.http.post<Libro>(this.API_URL, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  deleteMany(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/deleteMany`, { ids });
  }
}
