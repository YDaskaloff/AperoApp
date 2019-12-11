import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../_models/bike';

@Injectable({
  providedIn: 'root'
})
export class EditBikesService {

  baseUrl = environment.adminUrl + 'edit_bikes/';

  constructor(private http: HttpClient) { }

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.baseUrl);
  }

  getBike(id): Observable<Bike> {
    return this.http.get<Bike>(this.baseUrl + id);
  }

  deleteBike(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
