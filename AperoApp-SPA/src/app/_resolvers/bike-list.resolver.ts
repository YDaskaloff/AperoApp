import { Injectable } from '@angular/core';
import { Bike } from '../_models/bike';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { BikeService } from '../_services/bike.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BikeListResolver implements Resolve<Bike[]> {

    constructor(private bikeService: BikeService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Bike[]> {
        return this.bikeService.getBikes().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
