import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Editorial } from '../models/editorial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private apiUrl = 'http://localhost:3000/api/editoriales';

  constructor(private http: HttpClient) {}

  getEditoriales(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(this.apiUrl);
  }
  getAll(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(this.apiUrl);
  }
  getEditorialById(id: number): Observable<Editorial> {
    return this.http.get<Editorial>(`${this.apiUrl}/${id}`);
  }
  createEditorial(editorial: Editorial): Observable<Editorial> {
    return this.http.post<Editorial>(this.apiUrl, editorial);
  }
  updateEditorial(id: number, editorial: Editorial): Observable<Editorial> {
    return this.http.put<Editorial>(`${this.apiUrl}/${id}`, editorial);
  }
  deleteEditorial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  searchEditorialesByName(name: string): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.apiUrl}?nombre_like=${name}`);
  }
  searchEditorialesByEmail(email: string): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.apiUrl}?email_like=${email}`);
  }
  searchEditorialesByPhone(phone: string): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.apiUrl}?telefono_like=${phone}`);
  }
  searchEditorialesByWebsite(website: string): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.apiUrl}?sitio_web_like=${website}`);
  }
  searchEditorialesByFilter(filter: string): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.apiUrl}?nombre_like=${filter}&email_like=${filter}&telefono_like=${filter}&sitio_web_like=${filter}`);
  }
  getEditorialesByFilter(filter: string): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.apiUrl}?nombre_like=${filter}&email_like=${filter}&telefono_like=${filter}&sitio_web_like=${filter}`);
  }
  getEditorialesByName(name: string): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.apiUrl}?nombre_like=${name}`);
  }
  getEditorialesByEmail(email: string): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.apiUrl}?email_like=${email}`);
  }
}
