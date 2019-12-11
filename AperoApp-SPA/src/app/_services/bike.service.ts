import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Bike } from '../_models/bike';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.baseUrl + 'bikes');
  }

  getBike(id: number): Observable<Bike> {
    return this.http.get<Bike>(this.baseUrl + 'bikes/' + id);
  }


}
