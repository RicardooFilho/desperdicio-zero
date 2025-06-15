import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = `${environment.apiUrl}/foods`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  findById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }

  create(food: Food): Observable<Food> {
    return this.http.post<Food>(this.apiUrl, food);
  }

  update(id: number, food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${id}`, food);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
