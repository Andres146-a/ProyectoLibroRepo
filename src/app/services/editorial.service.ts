import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Editorial } from '../models/editorial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private apiUrl = 'http://localhost:4200/editoriales';

  constructor(private http: HttpClient) {}

  getEditoriales(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(this.apiUrl);
  }
}
