import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibroAutor } from '../models/libro-autor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroAutorService {
  private apiUrl = 'http://localhost:4200libroAutor';

  constructor(private http: HttpClient) {}

  getRelaciones(): Observable<LibroAutor[]> {
    return this.http.get<LibroAutor[]>(this.apiUrl);
  }
}
