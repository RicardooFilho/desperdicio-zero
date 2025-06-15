import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institution } from '../models/institution.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private apiUrl = `${environment.apiUrl}/institutions`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.apiUrl);
  }

  findById(id: number): Observable<Institution> {
    return this.http.get<Institution>(`${this.apiUrl}/${id}`);
  }

  create(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(this.apiUrl, institution);
  }

  update(id: number, institution: Institution): Observable<Institution> {
    return this.http.put<Institution>(`${this.apiUrl}/${id}`, institution);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
