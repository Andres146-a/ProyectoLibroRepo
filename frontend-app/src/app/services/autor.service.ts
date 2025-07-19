import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autor } from '../models/autor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private apiUrl = 'http://localhost:3000/api/autores';


  constructor(private http: HttpClient) {}

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }
  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }
  getAutorById(id: number): Observable<Autor> {
return this.http.get<Autor>(`${this.apiUrl}/${id}`);  }
  createAutor(autor: Partial<Autor>): Observable<Autor> {
  return this.http.post<Autor>('http://localhost:3000/api/autores', autor);
}

updateAutor(id: number, autor: Autor): Observable<Autor> {  
  console.log('📤 Enviando actualización del autor con ID:', id);
  console.log('📦 Datos del autor a actualizar:', autor);    
  return this.http.put<Autor>(`${this.apiUrl}/${id}`, autor); 
}

  deleteAutor(id: number): Observable<void> {
return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
getAutoresByLibro(idLibro: number): Observable<Autor[]> {
  return this.http.get<Autor[]>(`http://localhost:3000/api/libros/autores/libro/${idLibro}`);
}


 }
