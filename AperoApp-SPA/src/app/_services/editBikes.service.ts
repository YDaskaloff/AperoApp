import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../_models/bike';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EditBikesService {

  baseUrl = environment.adminUrl + 'edit_bikes/';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.baseUrl);
  }

  getBike(id: number): Observable<Bike> {
    return this.http.get<Bike>(this.baseUrl + id);
  }

  deleteBike(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  updateBike(id: number, bike: Bike) {
    return this.http.put(this.baseUrl + id, bike);
  }

  setMainPhoto(bikeId: number, id: number) {
    return this.http.post(this.baseUrl + bikeId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(bikeId: number, id: number) {
    return this.http.delete(this.baseUrl + bikeId + '/photos/' + id);
  }
}
