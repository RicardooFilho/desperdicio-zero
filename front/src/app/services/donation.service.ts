import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donation, DonationItem } from '../models/donation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = `${environment.apiUrl}/donations`;
  private donationItemsUrl = `${environment.apiUrl}/donation-items`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.apiUrl);
  }

  findById(id: number): Observable<Donation> {
    return this.http.get<Donation>(`${this.apiUrl}/${id}`);
  }

  create(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(this.apiUrl, donation);
  }

  update(id: number, donation: Donation): Observable<Donation> {
    return this.http.put<Donation>(`${this.apiUrl}/${id}`, donation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  findAllItems(): Observable<DonationItem[]> {
    return this.http.get<DonationItem[]>(this.donationItemsUrl);
  }

  findItemById(id: number): Observable<DonationItem> {
    return this.http.get<DonationItem>(`${this.donationItemsUrl}/${id}`);
  }

  createItem(donationItem: DonationItem): Observable<DonationItem> {
    return this.http.post<DonationItem>(this.donationItemsUrl, donationItem);
  }

  updateItem(id: number, donationItem: DonationItem): Observable<DonationItem> {
    return this.http.put<DonationItem>(`${this.donationItemsUrl}/${id}`, donationItem);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.donationItemsUrl}/${id}`);
  }


  getAvailableDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiUrl}?status=DISPONIVEL`);
  }

  collectDonation(id: number): Observable<Donation> {
    return this.http.patch<Donation>(`${this.apiUrl}/${id}/collect`, {});
  }

  cancelDonation(id: number): Observable<Donation> {
    return this.http.patch<Donation>(`${this.apiUrl}/${id}/cancel`, {});
  }
}